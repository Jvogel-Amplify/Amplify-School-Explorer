import React, { Component } from 'react'
import '../styles/Schools.scss'

export default class Schools extends React.Component {
    constructor() {
        super()
        this.state = { activeItems: [] }
        this.toggleActiveItem = this.toggleActiveItem.bind(this)
    }

    toggleActiveItem(id) {
        const selected = this.state.activeItems
        const index = selected.findIndex(item => item[id])

        if (index > -1) {
            selected.splice(index, 1)
        } else {
            selected.push({ [id]: true })
        }

        this.setState({ activeItem: selected })
    }

    render() {
        const filter = this.props.filter
        const schools = this.props.schools.filter(school => school.school.toLowerCase().indexOf(filter) !== -1)

        return (
            <ul>
                {schools.map(school => (
                    <li
                        className={this.state.activeItems.find(item => item[school.dbn]) ? 'active' : ''}
                        onClick={() => {
                            this.props.filterMap(school.dbn)
                            this.toggleActiveItem(school.dbn)
                        }}
                        key={school.dbn}>{school.school}
                    </li>
                ))}
            </ul>
        )
    }
}