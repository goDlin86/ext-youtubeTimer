import React, { useEffect, useState } from 'react'
import { render, createRoot } from 'react-dom'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import WeekDaysView from './components/WeekDaysView'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

const App = () => {
    const [date, setDate] = useState(dayjs())
    const [st, setStore] = useState([])
    const [sTime, setStartTime] = useState(null)
    const [sideLeft, setSideLeft] = useState(true)

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
            <ReactCSSTransitionReplace transitionName={sideLeft ? 'carousel-swap-left' : 'carousel-swap'} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                <WeekDaysView key={date.format('YYYY-MM-DD')} day={date} store={st} startTime={sTime} />
            </ReactCSSTransitionReplace>
            <div id='buttons'>
                <div className='prev' onClick={() => {setDate(date.add(-7, 'd')); setSideLeft(true)}}>&#60; Пред</div>
                <div>Неделя</div>
                <div className='next' onClick={() => {setDate(date.add(7, 'd')); setSideLeft(false)}}>След &#62;</div>
            </div>
        </>
    )
}

createRoot(document.getElementById('timer')).render(<App />)