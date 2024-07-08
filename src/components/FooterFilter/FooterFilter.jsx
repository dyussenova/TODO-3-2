import React, { Component } from 'react'
import './FooterFilter.css'

export default class FooterFilter extends Component {
  buttons = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }]
  render() {
    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name }) => {
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
}
