import React, { Component } from 'react'
import '../styles/Schools.scss'

export default class Schools extends React.Component {
    render() {
        const filter = this.props.filter
        const schools = this.props.schools.filter(school => school.school.toLowerCase().indexOf(filter) !== -1)

        return (
            <ul>
                {schools.map(school => (<li onClick={() => this.props.filterMap(school.dbn)} key={school.dbn}>{school.school}</li>))}
            </ul>
        )
    }
}