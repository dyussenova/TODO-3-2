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
    this.props.onToggleCompleted(this.props.id)
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
    const { id, editEdit } = this.props
    editEdit(id, this.props.label)
  }

  editSubmit = (e) => {
    e.preventDefault()

    this.onEdit()
  }

  render() {
    const { onDelete, data, completed } = this.props
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
          <input className="toggle" type="checkbox" checked={completed} onChange={this.onLabelClick} />

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
