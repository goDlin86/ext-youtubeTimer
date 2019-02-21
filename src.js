import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')
moment.updateLocale('ru', {
    calendar : {
        lastDay : 'Вчера',
        sameDay : 'Сегодня',
        lastWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[В прошлое] dddd'
                    case 1:
                    case 2:
                    case 4:
                        return '[В прошлый] dddd'
                    case 3:
                    case 5:
                    case 6:
                        return '[В прошлую] dddd'
                }
            } else {
                if (this.day() === 2) {
                    return '[Во] dddd'
                } else {
                    return '[В] dddd'
                }
            }
        }
    }
})

const day = moment()

let store = [],
    index = -1

chrome.storage.sync.get('store', (data) => {
    if (!chrome.runtime.error && data.store) {
        store = data.store
    }

    index = store.findIndex(obj => obj.date === day.format("YYYY-MM-DD"))
    if (index === -1) {
        store.push({ timer: 0, date: day.format("YYYY-MM-DD") })
        index = store.length - 1
    }

    let timer = ""
    for (let i = 1; i < 8; i++) {
        let k = store.length - i

        if (k > -1) {
            //const day = moment(store[k].date).format('ddd, D MMM')
            const day = moment(store[k].date).calendar()

            const dur = moment.duration(store[k].timer, 'seconds')
            let time = ''
            if (dur.hours() > 0)
                time += '<span class="hours">' + dur.hours() + "</span>" + 'ч '
            time += '<span class="minutes">' + dur.minutes() + "</span>" + 'м '
            time += '<span class="seconds">' + dur.seconds() + "</span>" + 'с'

            timer += '<div><span class="day">' + day + '</span> - ' + time + '</div>'
        }    
    }

    document.getElementById("timer").innerHTML = timer
})

