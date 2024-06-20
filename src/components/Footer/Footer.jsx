import PropTypes from 'prop-types'

import FooterFilter from '../FooterFilter'
import './Footer.css'

const Footer = ({ filter, onFilterChange, itemCount, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{itemCount} items left</span>
      <ul className="filters">
        <FooterFilter filter={filter} onFilterChange={onFilterChange} />
      </ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.defaultProps = {
  onFilterChange: () => {},
  clearCompleted: () => {},
}
Footer.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  clearCompleted: PropTypes.func,
  itemCount: PropTypes.number.isRequired,
}
export default Footer
