import { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }
  isValidNumber = (value) => {
    const number = Number(value)
    return !isNaN(number) && number >= 0
  }
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    const value = e.target.value
    if (this.isValidNumber(value)) {
      this.setState({ min: value })
    }
  }

  onSecChange = (e) => {
    const value = e.target.value
    if (this.isValidNumber(value)) {
      this.setState({ sec: value })
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    const { label, min, sec } = this.state
    const correctInput = label.trim()
    if (correctInput !== '') {
      this.props.onItemAdded(correctInput, min, sec)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={this.state.min}
          onChange={this.onMinChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={this.state.sec}
          onChange={this.onSecChange}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    )
  }
}
