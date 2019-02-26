import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

let store = [], index = -1

chrome.storage.sync.get('store', (data) => {
    if (!chrome.runtime.error && data.store) {
        store = data.store
    }

    index = store.findIndex(obj => obj.date === moment().format("YYYY-MM-DD"))
    if (index === -1) {
        store.push({ timer: 0, date: moment().format("YYYY-MM-DD") })
        index = store.length - 1
    }

    showWeekTimes()
})

let startWeek = moment().startOf('week').subtract(1, 'd')
let daysWeek = []
showWeekDays()

function showWeekDays() {
    daysWeek = []
    for (let i = 0; i < 7; i++) {
        const d = startWeek.add(1, 'd')
        daysWeek.push(d.format("YYYY-MM-DD"))
        document.getElementById("timer").innerHTML += "<div class='day'>" + d.format('dddd') + '<br/>' + d.format('D MMM') + "</div>"
        document.getElementById("timer").innerHTML += "<div class='time'></div>"
    }
}



function showWeekTimes() {
    for (let i = 0; i < 7; i++) {
        let k = store.findIndex(obj => obj.date === daysWeek[i])

        if (k > -1) {
            const dur = moment.duration(store[k].timer, 'seconds')
            let time = ''
            if (dur.hours() > 0)
                time += '<span class="hours">' + dur.hours() + "</span>" + 'ч '
            time += '<span class="minutes">' + dur.minutes() + "</span>" + 'м '
            time += '<span class="seconds">' + dur.seconds() + "</span>" + 'с'

            document.getElementsByClassName('time')[i].innerHTML = time

            if (moment().weekday() == i) {
                document.getElementsByClassName('day')[i].classList.add('today')
                document.getElementsByClassName('time')[i].classList.add('today')
            }
        }    
    }
}



document.getElementsByClassName('prev')[0].addEventListener('click', (e) => {
    document.getElementById("timer").innerHTML = ''
    startWeek = moment(daysWeek[0]).subtract(8, 'd')
    showWeekDays()
    showWeekTimes()
})
