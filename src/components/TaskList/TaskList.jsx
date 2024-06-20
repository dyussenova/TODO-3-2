import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({ todos, onDelete, onToggleCompleted }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <Task {...itemProps} key={id} onDelete={() => onDelete(id)} onToggleCompleted={() => onToggleCompleted(id)} />
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
