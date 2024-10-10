import { useState } from 'react'
import './NewTaskForm.css'

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    setMin(e.target.value)
  }

  const onSecChange = (e) => {
    setSec(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const correctInput = label.trim()
    if (correctInput !== '') {
      onItemAdded(correctInput, min, sec)
      setLabel('')
      setMin('')
      setSec('')
    }
  }

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        type="text"
        className="new-todo"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        autoFocus
        value={label}
      />
      <input
        type="number"
        min="0"
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        value={min}
        onChange={onMinChange}
      />
      <input
        type="number"
        min="0"
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        value={sec}
        onChange={onSecChange}
      />
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  )
}
export default NewTaskForm
