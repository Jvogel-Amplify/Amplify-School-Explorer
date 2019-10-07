import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

import '../styles/chart.scss'


export default class PerformanceImpactChart extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.chartService.drawPerformanceImpact('performanceImpact', this.props.selectedSchool)
    }

    render() {

        const toolTipStyle = {
            position: 'absolute',
            top: '61px',
            left: '266px',
            zIndex: 2,
            color: '#8F2261',
        }

        // const popUpStyle = {
        //     left: '55px',
        //     top: '183px',
        //     width: '500px',
        //     backgroundColor: 'white',
        //     border: '1px solid rgb(204, 204, 204)',
        //     color: 'rgb(51, 51, 51)',
        //     zIndex: '2',
        // }
        
        return (
            <div className="chart" style={{position: 'relative'}}>
                <div id='performanceImpact' style={{height:'100%'}}></div>
                <a style={toolTipStyle} className="tool-tip" data-tip data-for='performanceImpact'> ? </a>
                <ReactTooltip className="pop-up" id='performanceImpact' type='error'>
                <p><strong>Impact</strong> is based on how the school's results compared to its Comparison Group of similar students (based on factors such as incoming test scores, disability status, and economic need).</p>

                <br/>

                <p><strong>Performance</strong> is based on how the school's results compared to the citywide average (without any adjustments based on incoming student factors).</p>

                <br/>

                <p><u>Example</u>: A school in the upper right quadrant performed above its Comparison Group and above the citywide average.</p>
                </ReactTooltip>
            </div>   
        )
    }
}
