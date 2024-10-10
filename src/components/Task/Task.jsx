import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = ({
  id,
  label: initialLabel,
  min,
  sec,
  completed,
  data,
  onToggleCompleted,
  startTimer,
  stopTimer,
  onDelete,
  editEdit,
}) => {
  const [editing, setEditing] = useState(false)
  const [label, setLabel] = useState(initialLabel || '')

  useEffect(() => {
    setLabel(initialLabel)
  }, [initialLabel])

  const onLabelClick = () => {
    onToggleCompleted(id)
  }

  const onEdit = () => {
    setEditing((prevEditing) => !prevEditing)
  }

  const onEditChange = (e) => {
    setLabel(e.target.value)
  }

  const editSubmit = (e) => {
    e.preventDefault()
    editEdit(label)
    onEdit()
  }

  const distance = formatDistanceToNow(data, { includeSeconds: true })

  let className = ''
  if (completed) {
    className = 'completed'
  }
  if (editing) {
    className = 'editing'
  }

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onLabelClick} />
        <label>
          <span className="description">{label}</span>
          <button className="icon icon-play" onClick={() => startTimer(id)}></button>
          <button className="icon icon-pause" onClick={() => stopTimer(id)}></button>
          {min}:{String(sec).padStart(2, '0')}
          <span className="created">created {distance} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEdit}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {editing && (
        <form onSubmit={editSubmit}>
          <input type="text" className="edit" value={label} onChange={onEditChange} />
        </form>
      )}
    </li>
  )
}

export default Task
