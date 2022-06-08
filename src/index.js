import React, { useEffect, useState } from 'react'
import { render, createRoot } from 'react-dom'
import WeekDaysView from './components/WeekDaysView'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

const App = () => {
    const [date, setDate] = useState(dayjs())
    const [st, setStore] = useState([])
    const [sTime, setStartTime] = useState(null)

    useEffect(() => {
        chrome.storage.local.get(['store', 'startTime'], ({ store, startTime }) => {
            setStore(store)
            if (startTime) {
                setStartTime(startTime)
            }
        })
    }, [])

    return (
        <>
            <WeekDaysView day={date} store={st} startTime={sTime} />
            <div id="buttons">
                <div className="prev" onClick={() => setDate(date.add(-7, 'd'))}>&#60; Пред</div>
                <div>Неделя</div>
                <div className="next" onClick={() => setDate(date.add(7, 'd'))}>След &#62;</div>
            </div>
        </>
    )
}

createRoot(document.getElementById('timer')).render(<App />)