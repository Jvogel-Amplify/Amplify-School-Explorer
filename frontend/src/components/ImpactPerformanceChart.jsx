import React, { Component } from 'react'

export default class ImpactPerformanceChart extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        // TODO: call chartService.showChart()
    }

    render() {
        
        return (<div id='performanceImpact'>{this.props.selectedSchool}</div>)
    }
}
