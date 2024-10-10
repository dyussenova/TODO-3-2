import React, { useState, useEffect, useRef } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')
  const maxId = 100

  const createTodoItem = (label, min, sec) => ({
    id: maxId + todoData.length + 1,
    completed: false,
    label,
    min: parseInt(min, 10) || 0,
    sec: parseInt(sec, 10) || 0,
    data: new Date(),
  })

  const deleteItem = (id) => {
    stopTimer(id)
    setTodoData(todoData.filter((item) => item.id !== id))
  }

  const toggleCompleted = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    )
  }

  const clearCompleted = () => {
    setTodoData(todoData.filter((item) => !item.completed))
  }

  const editEdit = (id, newValue) => {
    setTodoData(todoData.map((item) => (item.id === id ? { ...item, label: newValue } : item)))
  }

  const addItem = (text, min = 0, sec = 0) => {
    const newItem = createTodoItem(text, min, sec)
    setTodoData((prevTodoData) => [...prevTodoData, newItem])
  }

  const filteredItems = (items, filter) => {
    switch (filter) {
      case 'All':
        return items
      case 'Active':
        return items.filter((item) => !item.completed)
      case 'Completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  const timersRef = useRef({})

  const startTimer = (id) => {
    if (timersRef.current[id]) return

    const timer = setInterval(() => {
      setTodoData((prevTodoData) => {
        const item = prevTodoData.find((task) => task.id === id)
        if (!item) {
          clearInterval(timer)
          delete timersRef.current[id]
          return prevTodoData
        }

        let newSec = item.sec - 1
        let newMin = item.min

        if (newSec < 0) {
          newSec = 59
          newMin -= 1
        }

        if (newMin < 0) {
          clearInterval(timer)
          delete timersRef.current[id]
          return prevTodoData.map((task) => (task.id === id ? { ...task, completed: true, sec: 0, min: 0 } : task))
        }

        return prevTodoData.map((task) => (task.id === id ? { ...task, min: newMin, sec: newSec } : task))
      })
    }, 1000)

    timersRef.current[id] = timer
  }

  const stopTimer = (id) => {
    if (timersRef.current[id]) {
      clearInterval(timersRef.current[id])
      delete timersRef.current[id]
    }
  }

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => clearInterval(timer))
    }
  }, [])

  const itemFil = filteredItems(todoData, filter)
  const itemCount = itemFil.filter((el) => !el.completed).length

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onItemAdded={addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={itemFil}
            onDelete={deleteItem}
            onToggleCompleted={toggleCompleted}
            editEdit={editEdit}
            startTimer={startTimer}
            stopTimer={stopTimer}
          />
          <Footer filter={filter} onFilterChange={setFilter} itemCount={itemCount} clearCompleted={clearCompleted} />
        </section>
      </section>
    </div>
  )
}

export default App
