import React, { Component } from 'react'
import '../styles/chart.scss'


export default class RaceChart extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.chartService.drawRace('race', this.props.selectedSchool)
    }

    render() {
        
        return (<div id='race' className="chart">{this.props.selectedSchool}</div>)
    }
}