import React, { useEffect, useState } from 'react'
import { render, createRoot } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import WeekDaysView from './components/WeekDaysView'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

const variants = {
    enter: (direction) => {
        return {
            transform: 'translateX(' + (direction > 0 ? '' : '-') + '100%)'
        }
    },
    center: {
        transform: 'translateX(0)'
    },
    exit: (direction) => {
        return {
            transform: 'translateX(' + (direction < 0 ? '' : '-') + '100%)'
        }
    }
}

const App = () => {
    const [date, setDate] = useState(dayjs())
    const [st, setStore] = useState([])
    const [sTime, setStartTime] = useState(null)
    const [direction, setDirection] = useState(true)

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
            <AnimatePresence initial={false} custom={direction} mode='wait'>
                <motion.div
                    key={date.format('MM-DD')}
                    custom={direction}
                    variants={variants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{
                        transform: { type: 'ease-in-out', duration: 0.4 }
                    }}
                >
                    <WeekDaysView key={date.format('YYYY-MM-DD')} day={date} store={st} startTime={sTime} />
                </motion.div>
            </AnimatePresence>

            <div id='buttons'>
                <div className='prev' onClick={() => {setDate(date.add(-7, 'd')); setDirection(-1)}}>&#60; Пред</div>
                <div>Неделя</div>
                <div className='next' onClick={() => {setDate(date.add(7, 'd')); setDirection(1)}}>След &#62;</div>
            </div>
        </>
    )
}

createRoot(document.getElementById('timer')).render(<App />)