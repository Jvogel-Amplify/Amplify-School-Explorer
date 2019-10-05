import React, { Component } from 'react'
import '../styles/chart.scss'


export default class EnrollmentChart extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.chartService.drawEnrollment('enrollment', this.props.selectedSchool)
    }

    render() {
        
        return (<div id='enrollment' className="chart">{this.props.selectedSchool}</div>)
    }
}
