Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1
    var dd = this.getDate()
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-')
}

const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
}

chrome.windows.onCreated.addListener((window) => {
    chrome.storage.local.set({ 'startTime': null })
    chrome.storage.local.set({ 'tabIds': [] })
    chrome.action.setBadgeText({ text: ' ' })
    chrome.action.setBadgeBackgroundColor({ color: [230, 230, 230, 230] })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        chrome.storage.local.get(['tabIds'], ({ tabIds }) => {
            if (tab.url.startsWith('https://www.youtube.com')) {
                if (!tabIds.includes(tabId)) {
                    tabIds.push(tabId)
                    chrome.storage.local.set({ tabIds })
                    if (tab.active) startTimer()
                }
            } else {
                if (tabIds.includes(tabId)) {
                    tabIds = tabIds.filter(id => id != tabId)
                    chrome.storage.local.set({ tabIds })
                    if (tab.active) stopTimer()
                }
            }
        })
    }
})

chrome.tabs.onActivated.addListener((tab) => {   
    chrome.storage.local.get(['tabIds', 'startTime'], ({ tabIds, startTime }) => {
        if (startTime && !tabIds.includes(tab.tabId)) stopTimer()
        if (!startTime && tabIds.includes(tab.tabId)) startTimer()
    })
})

chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.storage.local.get(['tabIds'], async ({ tabIds }) => {
        if (tabIds.includes(tabId)) {
            const curTab = await getCurrentTab()
            if (curTab.id == tabId) stopTimer()
            tabIds = tabIds.filter(id => id != tabId)
            chrome.storage.local.set({ tabIds })
        }
    })

})


const startTimer = () => {
    chrome.action.setBadgeBackgroundColor({ color: [230, 10, 10, 230] })
    chrome.storage.local.set({ 'startTime': new Date().getTime() })    
}

const stopTimer = () => {
    chrome.storage.local.get(['startTime'], ({ startTime }) => {
        if (startTime) {
            chrome.action.setBadgeBackgroundColor({ color: [230, 230, 230, 230] })
            chrome.storage.sync.get(['store'], ({ store }) => {
                let index = store.findIndex(obj => obj.date === new Date().yyyymmdd())
                if (index === -1) {
                    store.push({ timer: 0, date: new Date().yyyymmdd() })
                    index = store.length - 1  
                }
                store[index].timer += (new Date().getTime() - startTime) / 1000
                chrome.storage.local.set({ 'startTime': null })
                chrome.storage.sync.set({ store })
            })
        }
    })
}


chrome.windows.onRemoved.addListener((windowId) => {
    stopTimer()
    chrome.storage.local.set({ 'tabIds': [] })
})