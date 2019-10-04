import React, { Component } from 'react'
import axios from 'axios'
import '../styles/Schools.scss'

export default class Schools extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schools: []
        }
    }

    async componentDidMount() {
        const schools = await axios.get('http://localhost:9000/data/schoolData.json')
        this.setState({ schools: schools.data })
    }

    render() {
        return (
            <ul>
                {this.state.schools.map(school => (<li key={school.dbn + '-' + school.report_type}>{school.school}</li>))}
            </ul>
        )
    }
}