import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')


class Timer {
    constructor() {
        this.timerEl = document.getElementById('timer')
        this.today = moment().format("YYYY-MM-DD")
        this.startWeek = moment().startOf('week')
        this.currentWeekTime = 0
        this.store = []

        this.daysWeek = []
        this.showWeekDays()

        chrome.storage.sync.get('store', (data) => {
            if (!chrome.runtime.error && data.store) {
                this.store = data.store
            }
        
            this.showWeekTimes()
            this.connect()
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
            this.timerEl.innerHTML += "<div class='day'>" + d.format('dddd') + '<br/>' + d.format('D MMM') + "</div>"
            this.timerEl.innerHTML += "<div class='time'></div>"
        }

        this.timerEl.innerHTML += "<div class='allday'>Всего</div>"
        this.timerEl.innerHTML += "<div class='time'></div>"
    }

    showWeekTimes() {
        this.currentWeekTime = 0
        for (let i = 0; i < 7; i++) {
            let k = this.store.findIndex(obj => obj.date === this.daysWeek[i])
    
            if (k > -1) {
                this.currentWeekTime += this.store[k].timer

                const dur = moment.duration(this.store[k].timer, 'seconds')
                this.showTime(dur, i)
                
                //today
                if (this.today === this.store[k].date) {
                    document.getElementsByClassName('day')[i].classList.add('today')
                    document.getElementsByClassName('time')[i].classList.add('today')

                    if (this.startTime) this.startTimer()
                }
            }    
        }

        const dur = moment.duration(this.currentWeekTime, 'seconds')
        this.showTime(dur, 7)
    }

    showTime(dur, i, timer = false) {
        if (timer) {
            this.timerDurWeek.add(1, 's')
            this.showTime(this.timerDurWeek, 7)

            dur = this.timerDur.add(1, 's')
        }

        let time = ''
        time += '<span class="hours">' + (dur.hours() < 10 ? '0' : '') + dur.hours() + "</span>" + ' : '
        time += '<span class="minutes">' + (dur.minutes() < 10 ? '0' : '') + dur.minutes() + "</span>" + ' : '
        time += '<span class="seconds">' + (dur.seconds() < 10 ? '0' : '') + dur.seconds() + "</span>"

        document.getElementsByClassName('time')[i].innerHTML = time
    }

    connect() {
        const port = chrome.extension.connect({ name: "start time" })
        port.postMessage("give me start time")
        port.onMessage.addListener((msg) => {
            if (msg) {
                this.startTime = msg
                this.startTimer()
            }
        })
    }

    startTimer() {
        const d = this.store.find((obj) => obj.date === this.today)
        const dur = moment.duration(d.timer, 'seconds')

        this.timerDur = dur.add((new Date().getTime() - this.startTime) / 1000, 's')
        this.timerI = moment().weekday()

        //time for all week
        const durWeek = moment.duration(this.currentWeekTime, 'seconds')
        this.timerDurWeek = durWeek.add((new Date().getTime() - this.startTime) / 1000, 's')

        this.showTime(this.timerDur, this.timerI)
        this.showTime(this.timerDurWeek, 7)
        this.timerInterval = setInterval(this.showTime.bind(this, this.timerDur, this.timerI, true), 1000)
    }

    changeWeek(d) {
        clearInterval(this.timerInterval)
        clearInterval(this.timerIntervalWeek)
        this.timerEl.innerHTML = ''
        this.startWeek.add(d, 'd')
        this.daysWeek = []
        this.showWeekDays()
        this.showWeekTimes()
    }
}


const timer = new Timer()
