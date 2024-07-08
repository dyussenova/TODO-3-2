import { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const correctInput = this.state.label.trim()
    if (correctInput !== '') {
      this.props.onItemAdded(correctInput)
      this.setState({
        label: '',
      })
    }
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
        />
      </form>
    )
  }
}
