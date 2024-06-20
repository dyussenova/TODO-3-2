import React, { Component } from 'react'
import './FooterFilter.css'

export default class FooterFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]
  render() {
    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name
      const clazz = isActive ? 'selected' : ''
      return (
        <button className={clazz} key={name} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      )
    })
    return <li>{buttons}</li>
  }
}
