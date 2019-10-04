import React, { Component } from 'react'
import '../styles/chart.scss'


export default class PerformanceImpactChart extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.chartService.drawPerformanceImpact('performanceImpact', this.props.selectedSchool)
    }

    render() {
        
        return (<div id='performanceImpact' className="chart">{this.props.selectedSchool}</div>)
    }
}
