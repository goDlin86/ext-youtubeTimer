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
                }
            } else if (this.today === this.daysWeek[i]) {
                document.getElementsByClassName('day')[i].classList.add('today')
                document.getElementsByClassName('time')[i].classList.add('today')
            }
        }

        const dur = moment.duration(this.currentWeekTime, 'seconds')
        this.showTime(dur, 7)

        if (this.startTime && document.getElementsByClassName('today')[0]) 
            this.startTimer()
    }

    showTime(dur, i, timer = false) {
        // if (timer) {
        //     this.timerDurWeek.add(1, 's')
        //     this.showTime(this.timerDurWeek, 7)

        //     dur = this.timerDur.add(1, 's')
        // }

        // let time = ''
        // time += '<span class="hours">' + (dur.hours() < 10 ? '0' : '') + dur.hours() + "</span>" + ' : '
        // time += '<span class="minutes">' + (dur.minutes() < 10 ? '0' : '') + dur.minutes() + "</span>" + ' : '
        // time += '<span class="seconds">' + (dur.seconds() < 10 ? '0' : '') + dur.seconds() + "</span>"

        // document.getElementsByClassName('time')[i].innerHTML = time



        let digits = [
            Math.floor((dur.hours() / 10) % 10),
            dur.hours() % 10,
            Math.floor((dur.minutes() / 10) % 10),
            dur.minutes() % 10,
            Math.floor((dur.seconds() / 10) % 10),
            dur.seconds() % 10
        ]
        
        let clock = '<div class="clock ' + (timer ? 'anim' : '') + '">'
        clock += '<div class="digit hoursTen">' + this.timerDigits(digits[0], 6) + '</div>'
        clock += '<div class="digit hours">' + this.timerDigits(digits[1], 10) + '</div>'
        clock += '<div>:</div>'
        clock += '<div class="digit minsTen" style="animation-delay:-' + (dur.seconds() + digits[3] * 60) + 's">' + this.timerDigits(digits[2], 6) + '</div>'
        clock += '<div class="digit mins" style="animation-delay:-' + dur.seconds() + 's">' + this.timerDigits(digits[3], 10) + '</div>'
        clock += '<div>:</div>'
        clock += '<div class="digit secsTen" style="animation-delay:-' + digits[5] + 's">' + this.timerDigits(digits[4], 6) + '</div>'
        clock += '<div class="digit secs">' + this.timerDigits(digits[5], 10) + '</div>'

        document.getElementsByClassName('time')[i].innerHTML = clock
    }

    timerDigits(first, count) {
        let digits = ''

        for (let i = 0; i < count; i++) {
            let digit = i + first
            if (digit >= count) digit -= count
            digits += '<div>' + digit + '</div>'
        }

        return digits
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
        const time = d === undefined ? 0 : d.timer
        const dur = moment.duration(time, 'seconds')

        this.timerDur = dur.add((new Date().getTime() - this.startTime) / 1000, 's')
        this.timerI = moment().weekday()

        //time for all week
        const durWeek = moment.duration(this.currentWeekTime, 'seconds')
        this.timerDurWeek = durWeek.add((new Date().getTime() - this.startTime) / 1000, 's')

        this.showTime(this.timerDur, this.timerI, true)
        this.showTime(this.timerDurWeek, 7, true)
        //this.timerInterval = setInterval(this.showTime.bind(this, this.timerDur, this.timerI, true), 1000)
    }

    changeWeek(d) {
        clearInterval(this.timerInterval)
        this.timerEl.innerHTML = ''
        this.startWeek.add(d, 'd')
        this.daysWeek = []
        this.showWeekDays()
        this.showWeekTimes()
    }
}


const timer = new Timer()
