import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({ todos, onDelete, onToggleCompleted, editEdit, startTimer, stopTimer }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        {...itemProps}
        key={id}
        completed={item.completed}
        onDelete={() => onDelete(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        editEdit={(newValue) => editEdit(id, newValue)}
        startTimer={() => startTimer(id)}
        stopTimer={() => stopTimer(id)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}
TaskList.defaultProps = {
  onDelete: () => {},
  onToggleCompleted: () => {},
}
TaskList.propTypes = {
  onDelete: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default TaskList
