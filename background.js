Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1
    var dd = this.getDate()
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-')
}



chrome.action.setBadgeText({ text: ' ' })
//chrome.action.setBadgeBackgroundColor({ color: [230, 230, 230, 230] })


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        chrome.storage.local.get(['tabIds'], ({ tabIds }) => {
            if (tab.active) {
                chrome.storage.local.set({ 'curTabId': tabId })
                if (tab.url.startsWith('https://www.youtube.com')) {
                    if (!tabIds.includes(tabId)) {
                        startTimer()
                        tabIds.push(tabId)
                        chrome.storage.local.set({ tabIds })
                    }
                } else {
                    if (tabIds.includes(tabId)) {
                        stopTimer()
                        tabIds = tabIds.filter((id) => id != tabId)
                        chrome.storage.local.set({ tabIds })
                    }
                }
            } else {
                if (tab.url.startsWith('https://www.youtube.com')) {
                    if (!tabIds.includes(tabId)) {
                        tabIds.push(tabId)
                        chrome.storage.local.set({ tabIds })
                    }
                } else {
                    if (tabIds.includes(tabId)) {
                        tabIds.filter((id) => id != tabId)
                        chrome.storage.local.set({ tabIds })
                    }
                }
            }
        })
    }
})

chrome.tabs.onActivated.addListener((tab) => {   
    chrome.storage.local.set({ 'curTabId': tab.tabId })
    stopTimer()
    chrome.storage.local.get(['tabIds'], ({ tabIds }) => {
        if (tabIds.includes(tab.tabId)) {
            startTimer()
        }
    })
})

chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.storage.local.get(['tabIds'], ({ tabIds }) => {
        if (tabIds.includes(tabId)) {
            chrome.storage.local.get(['curTabId'], ({ curTabId }) => {
                if (curTabId == tabId) stopTimer()
            })
            tabIds = tabIds.filter((id) => id != tabId)
            chrome.storage.local.set({ tabIds })
        }
    })

})


// // chrome.extension.onConnect.addListener((port) => {
// //     port.onMessage.addListener((msg) => {
// //         port.postMessage((startTime) ? startTime.getTime() : null)
// //     })
// // })




startTimer = () => {
    chrome.action.setBadgeBackgroundColor({ color: [230, 10, 10, 230] })
    chrome.storage.local.set({ 'startTime': new Date().getTime() })    
}

stopTimer = () => {
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
                //chrome.storage.sync.set({ store })
            })
        }
    })
}


chrome.windows.onRemoved.addListener((windowId) => {
    stopTimer()
    chrome.storage.local.set({ 'tabIds': [] })
})