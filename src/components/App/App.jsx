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
  }

  createTodoItem(label) {
    return {
      id: this.maxId++,
      completed: false,
      label,
      data: new Date(),
    }
  }

  deleteItem = (id) => {
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
  addItem = (text) => {
    const newItem = this.createTodoItem(text)

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
