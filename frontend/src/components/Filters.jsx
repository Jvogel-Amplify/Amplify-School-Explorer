import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import Schools from './Schools'
import '../styles/Filters.scss'

export default class Example extends React.Component {
    constructor() {
        super()

        this.state = {
            filter: ''
        }

        this.filterSchools = this.filterSchools.bind(this)
    }

    filterMap(key) {
        this.props.filterMap(key)
    }

    filterSchools(event) {
        this.setState({
            filter: event.target.value.toLowerCase()
        })
    }

    render () {
        return (
            <Menu>
                <div className="school-filter">
                    <input
                        type="text"
                        placeholder="Type school name to filter the list below"
                        onChange={this.filterSchools}
                    />
                    <div className="schools-list">
                        <Schools schools={this.props.schools} filter={this.state.filter} filterMap={this.filterMap.bind(this)} />
                    </div>
                </div>
            </Menu>
        )
    }
}
