import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import duration from 'dayjs/plugin/duration'

dayjs.locale('ru')
dayjs.extend(duration)

const TimeView = ({ duration, startTime }) => {
    const allduration = duration + (startTime ? (new Date().getTime() - startTime) / 1000 : 0)
    const dur = dayjs.duration(allduration, 'seconds')
    const hours = dur.hours() + 24 * dur.days()

    const digits = [
        Math.floor((hours / 10) % 10),
        hours % 10,
        Math.floor((dur.minutes() / 10) % 10),
        dur.minutes() % 10,
        Math.floor((dur.seconds() / 10) % 10),
        dur.seconds() % 10
    ]

    const timerDigits = (first, count) => {
        return [...Array(count).keys()].map((i) => {
            let digit = i + first
            if (digit >= count) digit -= count
            return <div>{digit}</div>
        })
    }

    return (
        <div className='time'>
            {allduration > 0 &&
            <div className={startTime ? 'clock anim' : 'clock'}>
                <div className='digit hoursTen' style={startTime ? {animationDelay: -(digits[1] * 3600 + dur.minutes() * 60 + dur.seconds()) + 's'} : {}}>
                    {startTime ? timerDigits(digits[0], 6) : digits[0]}
                </div>
                <div className='digit hours' style={startTime ? {animationDelay: -(dur.minutes() * 60 + dur.seconds()) + 's'} : {}}>
                    {startTime ? timerDigits(digits[1], 10) : digits[1]}
                </div>
                <div>:</div>
                <div className='digit minsTen' style={startTime ? {animationDelay: -(dur.seconds() + digits[3] * 60) + 's'} : {}}>
                    {startTime ? timerDigits(digits[2], 6) : digits[2]}
                </div>
                <div className='digit mins' style={startTime ? {animationDelay: -dur.seconds() + 's'} : {}}>
                    {startTime ? timerDigits(digits[3], 10) : digits[3]}
                </div>
                <div>:</div>
                <div className='digit secsTen' style={startTime ? {animationDelay: -digits[5] + 's'} : {}}>
                    {startTime ? timerDigits(digits[4], 6) : digits[4]}
                </div>
                <div className='digit secs'>
                    {startTime ? timerDigits(digits[5], 10) : digits[5]}
                </div>
            </div>
            }
        </div>
    )
}

export default TimeView