import React, { Component } from 'react'
import '../styles/performanceImpact.scss'


export default class ImpactPerformanceChart extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.chartService.drawScatterPlot('performanceImpact', this.props.selectedSchool)
    }

    render() {
        
        return (<div id='performanceImpact' className="chart">{this.props.selectedSchool}</div>)
    }
}
