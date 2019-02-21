Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1
    var dd = this.getDate()
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-')
}


let timer, 
    tabIds = [],
    store = [],
    index = -1

const day = new Date()

//chrome.storage.sync.clear()
chrome.storage.sync.get('store', (data) => {
    if (!chrome.runtime.error && data.store) {
        store = data.store
    }

    index = store.findIndex(obj => obj.date === day.yyyymmdd())
    if (index === -1) {
        store.push({ timer: 0, date: day.yyyymmdd() })
        index = store.length - 1
    }
})

chrome.browserAction.setBadgeText({ text: " " })
chrome.browserAction.setBadgeBackgroundColor({ color: [230, 230, 230, 230] })


// chrome.webNavigation.onCompleted.addListener((tab) => {
// }, {url: [{urlMatches : 'https://www.youtube.com/'}]})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
        if (tab.active) {
            if (tab.url.startsWith("https://www.youtube.com")) {
                if (!tabIds.includes(tabId)) {
                    startTimer(tabId)
                    tabIds.push(tabId)
                }
            } else {
                if (tabIds.includes(tabId)) {
                    stopTimer(tabId)
                }
            }
        } else {
            if (tab.url.startsWith("https://www.youtube.com")) {
                if (!tabIds.includes(tabId)) {
                    tabIds.push(tabId)
                }
            } else {
                if (tabIds.includes(tabId)) {
                    tabIds.filter((id) => id != tabId)
                }
            }
        }
    }
})

chrome.tabs.onActivated.addListener((tab) => {
    if (tabIds.includes(tab.tabId)) {
        startTimer(tab.tabId)
    } else {
        stopTimer(tab.tabId)
    }
})

chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabIds.includes(tabId)) {
        stopTimer(tabId)
    }        
})




startTimer = (tabId) => {
    chrome.browserAction.setBadgeBackgroundColor({ color: [230, 10, 10, 230] })
    clearInterval(timer)
    timer = setInterval(() => store[index].timer++, 1000)
}


stopTimer = (tabId) => {
    chrome.browserAction.setBadgeBackgroundColor({ color: [230, 230, 230, 230] })
    clearInterval(timer)
    tabIds = tabIds.filter((id) => id != tabId)
    chrome.storage.sync.set({ store })
}