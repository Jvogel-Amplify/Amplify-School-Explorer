import React, { Component } from 'react'
import '../styles/chart.scss'


export default class FrameworkScoreChart extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.chartService.drawFrameworkScore(this.props.code, this.props.selectedSchool)
    }

    render() {
        
        return (<div id={this.props.code} className="chart">{this.props.selectedSchool}</div>)
    }
}