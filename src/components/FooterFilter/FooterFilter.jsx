import React from 'react'
import './FooterFilter.css'

const FooterFilter = ({ filter, onFilterChange }) => {
  const buttons = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }].map(({ name }) => {
    const isActive = filter === name
    const clazz = isActive ? 'selected' : ''
    return (
      <li key={name}>
        <button className={clazz} onClick={() => onFilterChange(name)}>
          {name}
        </button>
      </li>
    )
  })

  return <>{buttons}</>
}
export default FooterFilter
