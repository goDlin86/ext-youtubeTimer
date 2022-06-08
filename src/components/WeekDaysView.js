import React from 'react'
import TimeView from './TimeView'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

const WeekDaysView = ({ day, store, startTime }) => {
    const today = dayjs().format('YYYY-MM-DD')
    const startWeek = day.startOf('week')
    let currentWeekTime = 0

    return (
        <>
            {[...Array(7).keys()].map((i) => {
                const d = startWeek.add(i, 'day')
                const k = store.findIndex(obj => obj.date === d.format('YYYY-MM-DD'))

                let dur = 0
                if (k > -1) {
                    currentWeekTime += store[k].timer
                    dur = store[k].timer
                }

                return (
                    <>
                        <div className={today === d.format('YYYY-MM-DD') ? 'day today' : 'day'}>
                            <div>
                                {d.format('dddd')}
                                <br/>
                                {d.format('D MMM')}
                            </div>
                            {dur > 0 && <TimeView duration={dur} startTime={today === d.format('YYYY-MM-DD') ? startTime : null} />}
                        </div>
                        {i === 6 && 
                            <div className='day'>
                                <div className='allday'>Всего</div>
                                {currentWeekTime > 0 && <TimeView duration={currentWeekTime} startTime={startTime} />}
                            </div>
                        }
                    </>
                )
            })}
        </>
    )
}

export default WeekDaysView