import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import duration from 'dayjs/plugin/duration'

dayjs.locale('ru')
dayjs.extend(duration)

class Timer {
    constructor() {
        this.timerEl = document.getElementById('timer')
        this.today = dayjs().format('YYYY-MM-DD')
        this.startWeek = dayjs().startOf('week')
        this.currentWeekTime = 0
        this.store = []

        this.daysWeek = []
        this.showWeekDays()

        chrome.storage.sync.get(['store'], ({ store }) => {
            this.store = store  
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
            this.daysWeek.push(d.format('YYYY-MM-DD'))
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

                const dur = dayjs.duration(this.store[k].timer, 'seconds')
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

        const dur = dayjs.duration(this.currentWeekTime, 'seconds')
        this.showTime(dur, 7)

        chrome.storage.local.get(['startTime'], ({ startTime }) => {
            if (startTime && document.getElementsByClassName('today')[0]) {
                this.startTimer(startTime)
            }
        })
    }

    showTime(dur, i, timer = false) {
        const hours = dur.hours() + 24 * dur.days()

        let digits = [
            Math.floor((hours / 10) % 10),
            hours % 10,
            Math.floor((dur.minutes() / 10) % 10),
            dur.minutes() % 10,
            Math.floor((dur.seconds() / 10) % 10),
            dur.seconds() % 10
        ]

        let clock = ''
        if (timer) {
            clock = '<div class="clock anim">'
            clock += '<div class="digit hoursTen" style="animation-delay:-' + (digits[1] * 3600 + dur.minutes() * 60 + dur.seconds()) + 's">' + this.timerDigits(digits[0], 6) + '</div>'
            clock += '<div class="digit hours" style="animation-delay:-' + (dur.minutes() * 60 + dur.seconds()) + 's">' + this.timerDigits(digits[1], 10) + '</div>'
            clock += '<div>:</div>'
            clock += '<div class="digit minsTen" style="animation-delay:-' + (dur.seconds() + digits[3] * 60) + 's">' + this.timerDigits(digits[2], 6) + '</div>'
            clock += '<div class="digit mins" style="animation-delay:-' + dur.seconds() + 's">' + this.timerDigits(digits[3], 10) + '</div>'
            clock += '<div>:</div>'
            clock += '<div class="digit secsTen" style="animation-delay:-' + digits[5] + 's">' + this.timerDigits(digits[4], 6) + '</div>'
            clock += '<div class="digit secs">' + this.timerDigits(digits[5], 10) + '</div>'
        } else {
            clock = '<div class="clock">'
            clock += '<div class="digit hoursTen">' + digits[0] + '</div>'
            clock += '<div class="digit hours">' + digits[1] + '</div>'
            clock += '<div>:</div>'
            clock += '<div class="digit minsTen">' + digits[2] + '</div>'
            clock += '<div class="digit mins">' + digits[3] + '</div>'
            clock += '<div>:</div>'
            clock += '<div class="digit secsTen">' + digits[4] + '</div>'
            clock += '<div class="digit secs">' + digits[5] + '</div>'
        }

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

    startTimer(startTime) {
        const d = this.store.find((obj) => obj.date === this.today)
        const time = d === undefined ? 0 : d.timer
        const dur = dayjs.duration(time, 'seconds')

        this.timerDur = dur.add((new Date().getTime() - startTime) / 1000, 's')
        this.timerI = dayjs().day() == 0 ? 6 : dayjs().day() - 1

        //time for all week
        const durWeek = dayjs.duration(this.currentWeekTime, 'seconds')
        this.timerDurWeek = durWeek.add((new Date().getTime() - startTime) / 1000, 's')

        this.showTime(this.timerDur, this.timerI, true)
        this.showTime(this.timerDurWeek, 7, true)
    }

    changeWeek(d) {
        this.timerEl.innerHTML = ''
        this.startWeek = this.startWeek.add(d, 'd')
        this.daysWeek = []
        this.showWeekDays()
        this.showWeekTimes()
    }
}


const timer = new Timer()
