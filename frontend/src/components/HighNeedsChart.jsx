import React, { Component } from 'react'
import '../styles/chart.scss'


export default class HighNeedsChart extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.chartService.drawHighNeeds('highNeeds', this.props.selectedSchool)
    }

    render() {
        
        return (<div id='highNeeds' className="chart">{this.props.selectedSchool}</div>)
    }
}
