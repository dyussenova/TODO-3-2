import { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({ min: e.target.value })
  }

  onSecChange = (e) => {
    this.setState({ sec: e.target.value })
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
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.onSubmit(e)
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
          onKeyDown={this.handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={this.state.min}
          onChange={this.onMinChange}
          onKeyDown={this.handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={this.state.sec}
          onChange={this.onSecChange}
          onKeyDown={this.handleKeyDown}
        />
      </form>
    )
  }
}
