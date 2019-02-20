Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1
    var dd = this.getDate()
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-')
}

toHHMMSS = (sec) => {
    var hours   = Math.floor(sec / 3600)
    var minutes = Math.floor((sec - (hours * 3600)) / 60)
    var seconds = sec - (hours * 3600) - (minutes * 60)

    var r = ""
    if (hours > 0) r += hours + "h "
    r += minutes + "m " + seconds + "s"
    return r
}

const day = new Date()

var store = [],
    index = -1

chrome.storage.sync.get('store', (data) => {
    if (!chrome.runtime.error && data.store) {
        store = data.store
    }

    index = store.findIndex(obj => obj.date === day.yyyymmdd())
    if (index === -1) {
        store.push({ timer: 0, date: day.yyyymmdd() })
        index = store.length - 1
    }

    var timer = ""
    for (var i = 1; i < 8; i++) {
        var k = store.length - i
        if (k > -1)
            timer += "<div>" + store[k].date + " - " + toHHMMSS(store[k].timer) + "</div>"
    }

    document.getElementById("timer").innerHTML = timer
})

