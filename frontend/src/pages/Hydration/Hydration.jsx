"use client"

import { useState, useEffect } from "react"
import "./Hydration.css"
import { Droplet } from 'lucide-react'

const Hydration = () => {
  // Constants
  const DAILY_GOAL = 4000 // ml
  const DRINK_AMOUNT = 200 // ml
  
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Initialize state from localStorage or with default values
  const [hydrationData, setHydrationData] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('hydrationData')
      if (savedData) {
        return JSON.parse(savedData)
      }
    }
    
    // Default data structure
    return {
      dailyLogs: {}, // Format: { "YYYY-MM-DD": [{ time: timestamp, amount: ml }] }
      totalIntake: 0,
      daysTracked: 0
    }
  })

  // Calculate daily intake for today
  const calculateDailyIntake = () => {
    const todayDate = getTodayDate()
    const todayLog = hydrationData.dailyLogs[todayDate] || []
    return todayLog.reduce((total, entry) => total + entry.amount, 0)
  }

  const calculateAverageIntake = () => {
    let totalEntries = 0
    let totalAmount = 0
  
    for (const day in hydrationData.dailyLogs) {
      const entries = hydrationData.dailyLogs[day]
      totalEntries += entries.length
      totalAmount += entries.reduce((sum, entry) => sum + entry.amount, 0)
    }
  
    if (totalEntries === 0) return 0
    return Math.round(totalAmount / totalEntries)
  }

  const [dailyIntake, setDailyIntake] = useState(calculateDailyIntake)
  const [averageIntake, setAverageIntake] = useState(calculateAverageIntake)
  const [totalIntake, setTotalIntake] = useState(hydrationData.totalIntake)

  // Update localStorage whenever hydrationData changes
  useEffect(() => {
    localStorage.setItem('hydrationData', JSON.stringify(hydrationData))
    
    // Update the derived state values
    setDailyIntake(calculateDailyIntake())
    setAverageIntake(calculateAverageIntake())
    setTotalIntake(hydrationData.totalIntake)
  }, [hydrationData])

  // Check for day change
  useEffect(() => {
    const todayDate = getTodayDate()
    
    // If we don't have an entry for today, increment daysTracked
    if (!hydrationData.dailyLogs[todayDate]) {
      setHydrationData(prevData => {
        // Only increment if we have previous data (not first use)
        const shouldIncrementDays = Object.keys(prevData.dailyLogs).length > 0
        
        return {
          ...prevData,
          dailyLogs: {
            ...prevData.dailyLogs,
            [todayDate]: []
          },
          daysTracked: shouldIncrementDays ? prevData.daysTracked + 1 : prevData.daysTracked
        }
      })
    }
  }, [])

  // Handle drink button click
  const handleDrink = () => {
    const todayDate = getTodayDate()
    const currentTime = new Date().toLocaleTimeString()
    
    setHydrationData(prevData => {
      // Create today's log array if it doesn't exist
      const todayLog = prevData.dailyLogs[todayDate] || []
      
      // Add new entry
      const updatedTodayLog = [
        ...todayLog,
        { time: currentTime, amount: DRINK_AMOUNT }
      ]
      
      // Update total intake
      const newTotalIntake = prevData.totalIntake + DRINK_AMOUNT
      
      return {
        ...prevData,
        dailyLogs: {
          ...prevData.dailyLogs,
          [todayDate]: updatedTodayLog
        },
        totalIntake: newTotalIntake
      }
    })
  }

  // Calculate progress percentages
  const dailyProgress = Math.min(Math.round((dailyIntake / DAILY_GOAL) * 100), 100)
  const averageProgress = Math.min(Math.round((averageIntake / DAILY_GOAL) * 100), 100)
  const totalProgress = Math.min(Math.round((totalIntake / (DAILY_GOAL * Math.max(hydrationData.daysTracked, 1))) * 100), 100)

  // Get today's log entries
  const todayDate = getTodayDate()
  const todayLog = hydrationData.dailyLogs[todayDate] || []

  return (
    <div className="hydration-tracking">
      <div className="hydration-stats">
        <div className="stat-card daily">
          <div className="progress-circle-container">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle daily"
                  strokeDasharray={`${dailyProgress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{dailyProgress}%</text>
              </svg>
            </div>
          </div>
          <div className="stat-info">
            <h3>Daily Intake</h3>
            <p className="stat-value">{dailyIntake} ml</p>
          </div>
        </div>

        <div className="stat-card average">
          <div className="progress-circle-container">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle average"
                  strokeDasharray={`${averageProgress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{averageProgress}%</text>
              </svg>
            </div>
          </div>
          <div className="stat-info">
            <h3>Average Intake</h3>
            <p className="stat-value">{averageIntake} ml</p>
          </div>
        </div>

        <div className="stat-card total">
          <div className="progress-circle-container">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle total"
                  strokeDasharray={`${totalProgress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{totalProgress}%</text>
              </svg>
            </div>
          </div>
          <div className="stat-info">
            <h3>Total Intake</h3>
            <p className="stat-value">{totalIntake} ml</p>
          </div>
        </div>
      </div>

      <div className="goals">
        <Droplet className="droplet-icon" />
        <h2>Intake Goal</h2>
        <p className="goal-progress">
          {dailyIntake} ml / {DAILY_GOAL} ml
        </p>
      </div>

      <div className="drink-log-section">
        <h2>Drink Log</h2>
        <div className="drink-log">
          {todayLog.length > 0 ? (
            todayLog.map((entry, index) => (
              <div className="log-entry" key={index}>
                <div className="log-entry-dot"></div>
                <span className="log-entry-time">{entry.time}</span>
                <span className="log-entry-amount">{entry.amount} ml</span>
              </div>
            ))
          ) : (
            <div className="no-entries">No entries for today. Start drinking!</div>
          )}
        </div>
      </div>

      <button className="drink-button" onClick={handleDrink}>
        Drink ({DRINK_AMOUNT} mL)
      </button>
    </div>
  )
}

export default Hydration
