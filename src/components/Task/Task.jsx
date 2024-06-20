import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    completed: false,
    editing: false,
    label: this.props.label,
  }
  onLabelClick = () => {
    this.setState(({ completed }) => {
      return {
        completed: !completed,
      }
    })
  }

  onEdit = () => {
    this.setState(({ editing }) => {
      return {
        editing: !editing,
      }
    })
  }

  onEditChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  editSubmit = (e) => {
    e.preventDefault()

    this.onEdit()
  }
  render() {
    const { onDelete, data, onToggleCompleted, completed } = this.props
    const { editing, label } = this.state

    const distance = formatDistanceToNow(data, {
      includeSeconds: true,
    })

    let className = ' '
    if (completed) {
      className = 'completed'
    }
    if (editing) {
      className = 'editing'
    }

    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onClick={this.onLabelClick}
            onChange={onToggleCompleted}
          />

          <label>
            <span className="description">{label}</span>
            <span className="created">created {distance} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEdit}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        {this.state.editing && (
          <form onSubmit={this.editSubmit}>
            <input type="text" className="edit" value={label} onChange={this.onEditChange} />
          </form>
        )}
      </li>
    )
  }
}
