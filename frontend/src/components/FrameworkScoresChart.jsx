import React, { Component } from 'react'
import '../styles/chart.scss'


export default class FrameworkScoresChart extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.chartService.drawFrameworkScores('frameworkScores', this.props.selectedSchool)
    }

    render() {
        
        return (<div id='frameworkScores' className="chart">{this.props.selectedSchool}</div>)
    }
}
