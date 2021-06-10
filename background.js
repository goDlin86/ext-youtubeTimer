Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1
    var dd = this.getDate()
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-')
}


chrome.action.setBadgeText({ text: ' ' })

chrome.windows.onCreated.addListener(window => {
    chrome.storage.local.set({ 'startTime': null })
    chrome.action.setBadgeBackgroundColor({ color: [230, 230, 230, 230] })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        if (tab.active) {
            if (tab.url.startsWith('https://www.youtube.com')) {
                startTimer()
            } else {
                stopTimer()
            }
        }
    }
})

chrome.tabs.onActivated.addListener(activeInfo => {
    setTimeout(() => {
        chrome.tabs.get(activeInfo.tabId, tab => {
            if (tab.url.startsWith('https://www.youtube.com')) {
                startTimer()
            } else {
                stopTimer()
            }
        })
    }, 500)
})


const startTimer = () => {
    chrome.storage.local.get(['startTime'], ({ startTime }) => {
        if (!startTime) {
            chrome.action.setBadgeBackgroundColor({ color: [230, 10, 10, 230] })
            chrome.storage.local.set({ 'startTime': new Date().getTime() })
        }
    })
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
})