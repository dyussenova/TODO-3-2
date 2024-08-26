import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  maxId = 100
  state = {
    todoData: [],
    filter: 'all',
    timerData: {},
  }

  createTodoItem(label, min, sec) {
    return {
      id: this.maxId++,
      completed: false,
      label,
      min: min || 0,
      sec: sec || 0,
      data: new Date(),
    }
  }

  deleteItem = (id) => {
    this.stopTimer(id)
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((elem) => elem.id === id)

      const newArr = [...todoData.slice(0, index), ...todoData.slice(index + 1)]

      return {
        todoData: newArr,
      }
    })
  }

  toggleCompleted = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        } else {
          return item
        }
      }),
    }))
  }

  clearCompleted = () => {
    this.setState((prevState) => {
      const filteredItems = prevState.todoData.filter((item) => !item.completed)
      return {
        todoData: filteredItems,
      }
    })
  }
  editEdit = (id, newValue) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((item) => {
        if (item.id === id) {
          return { ...item, label: newValue }
        } else {
          return item
        }
      }),
    }))
  }
  addItem = (text, min = 0, sec = 0) => {
    const newItem = this.createTodoItem(text, min, sec)

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return {
        todoData: newArray,
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }
  filteredItems(items, filter) {
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
  startTimer = (id) => {
    if (this.state.timerData[id]) return

    const timer = setInterval(() => {
      this.setState((prevState) => {
        const item = prevState.todoData.find((task) => task.id === id)
        if (!item) return { timerData: { ...prevState.timerData, [id]: null } }

        const newSec = item.sec > 0 ? item.sec - 1 : 59
        const newMin = item.sec === 0 ? item.min - 1 : item.min

        if (newMin < 0 || (newMin === 0 && newSec < 0)) {
          clearInterval(prevState.timerData[id])
          return { timerData: { ...prevState.timerData, [id]: null } }
        }

        const updatedData = prevState.todoData.map((task) => {
          if (task.id === id) {
            return { ...task, min: newMin, sec: newSec }
          }
          return task
        })

        return { todoData: updatedData, timerData: { ...prevState.timerData, [id]: timer } }
      })
    }, 1000)
  }
  stopTimer = (id) => {
    if (this.state.timerData[id]) {
      clearInterval(this.state.timerData[id])
      this.setState((prevState) => ({
        timerData: { ...prevState.timerData, [id]: null },
      }))
    }
  }

  render() {
    const { filter, todoData } = this.state

    const itemFil = this.filteredItems(todoData, filter)
    const itemCount = itemFil.filter((el) => !el.completed).length

    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>Todos</h1>
            <NewTaskForm onItemAdded={this.addItem} />
          </header>
          <section className="main">
            <TaskList
              todos={itemFil}
              onDelete={this.deleteItem}
              onToggleCompleted={this.toggleCompleted}
              editEdit={this.editEdit}
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
            />
            <Footer
              filter={filter}
              onFilterChange={this.onFilterChange}
              itemCount={itemCount}
              clearCompleted={this.clearCompleted}
            />
          </section>
        </section>
      </div>
    )
  }
}
