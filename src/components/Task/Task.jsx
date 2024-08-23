import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    completed: false,
    editing: false,
    label: this.props.label || '',
    min: this.props.min || 0,
    sec: this.props.sec || 0,
  }

  handleStartTimer = () => {
    this.props.startTimer(this.props.id)
  }
  handleStopTimer = () => {
    this.props.stopTimer(this.props.id)
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
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }))
  }

  onEditChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  editSubmit = (e) => {
    e.preventDefault()
    const { editEdit } = this.props
    editEdit(this.state.label)
    this.onEdit()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.min !== this.props.min || prevProps.sec !== this.props.sec) {
      this.setState({ min: this.props.min, sec: this.props.sec })
    }
  }

  render() {
    const { onDelete, data, completed } = this.props
    const { editing, label, min, sec } = this.state

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
            <button className="icon icon-play" onClick={this.handleStartTimer}></button>
            <button className="icon icon-pause" onClick={this.handleStopTimer}></button>
            {min}:{sec < 10 ? `0${sec}` : sec}
            <span className="created">created {distance} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEdit}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        {this.state.editing && (
          <form onSubmit={this.editSubmit}>
            <input type="text" className="edit" value={this.state.label} onChange={this.onEditChange} />
          </form>
        )}
      </li>
    )
  }
}
