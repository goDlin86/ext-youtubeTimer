import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')


class Timer {
    constructor() {
        this.timer = document.getElementById('timer')
        this.today = moment()
        this.startWeek = moment().startOf('week')
        this. store = []

        this.daysWeek = []
        this.showWeekDays()

        chrome.storage.sync.get('store', (data) => {
            if (!chrome.runtime.error && data.store) {
                this.store = data.store
            }
        
            const index = this.store.findIndex(obj => obj.date === moment().format("YYYY-MM-DD"))
            if (index === -1) {
                this.store.push({ timer: 0, date: moment().format("YYYY-MM-DD") })
            }
        
            this.showWeekTimes()
        })

        document.getElementsByClassName('prev')[0].addEventListener('click', (e) => {
            this.changeWeek(-7)
        })
        document.getElementsByClassName('next')[0].addEventListener('click', (e) => {
            this.changeWeek(7)
        })
    }

    showWeekDays() {
        for (let i = 0; i < 7; i++) {
            const d = this.startWeek.clone().add(i, 'd')
            this.daysWeek.push(d.format("YYYY-MM-DD"))
            this.timer.innerHTML += "<div class='day'>" + d.format('dddd') + '<br/>' + d.format('D MMM') + "</div>"
            this.timer.innerHTML += "<div class='time'></div>"
        }
    }

    showWeekTimes() {
        for (let i = 0; i < 7; i++) {
            let k = this.store.findIndex(obj => obj.date === this.daysWeek[i])
    
            if (k > -1) {
                const dur = moment.duration(this.store[k].timer, 'seconds')
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

    changeWeek(d) {
        this.timer.innerHTML = ''
        this.startWeek.add(d, 'd')
        this.daysWeek = []
        this.showWeekDays()
        this.showWeekTimes()
    }
}


const timer = new Timer()
