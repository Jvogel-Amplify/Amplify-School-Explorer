import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import FrameworkScoreChart from './FrameworkScoreChart'
import 'react-tabs/style/react-tabs.css'
import '../styles/chart.scss'

const frameworkScoreCodes = ["CT", "ES", "RI", "SE", "SF", "TR"]

const frameworkScoreCodeMap = {
    "CT": "Collaborative Teachers",
    "ES": "Effective School Leadership",
    "RI": "Rigorous Instruction",
    "SE": "Supportive Environment",
    "SF": "Strong Family-Community Ties",
    "TR": "Trust",
    "SA": "Student Achievement",
}


export default class FrameworkScoresChart extends React.Component {
    constructor() {
        super()
    }
    
    render() {
        return (
            <div id='frameworkScores' className="row">
                <Tabs>
                    <TabList>
                        <Tab>{frameworkScoreCodeMap["CT"]}</Tab>
                        <Tab>{frameworkScoreCodeMap["ES"]}</Tab>
                        <Tab>{frameworkScoreCodeMap["RI"]}</Tab>
                        <Tab>{frameworkScoreCodeMap["SE"]}</Tab>
                        <Tab>{frameworkScoreCodeMap["SF"]}</Tab>
                        <Tab>{frameworkScoreCodeMap["TR"]}</Tab>
                    </TabList>
                    <div className="row">
                        <div className='col'>
                            <TabPanel>
                                <FrameworkScoreChart selectedSchool={this.props.selectedSchool} code="CT" chartService={this.props.chartService}></FrameworkScoreChart>
                            </TabPanel>
                            <TabPanel>
                                <FrameworkScoreChart selectedSchool={this.props.selectedSchool} code="ES" chartService={this.props.chartService}></FrameworkScoreChart>
                            </TabPanel>
                            <TabPanel>
                                <FrameworkScoreChart selectedSchool={this.props.selectedSchool} code="RI" chartService={this.props.chartService}></FrameworkScoreChart>
                            </TabPanel>
                            <TabPanel>
                                <FrameworkScoreChart selectedSchool={this.props.selectedSchool} code="SE" chartService={this.props.chartService}></FrameworkScoreChart>
                            </TabPanel>
                            <TabPanel>
                                <FrameworkScoreChart selectedSchool={this.props.selectedSchool} code="SF" chartService={this.props.chartService}></FrameworkScoreChart>
                            </TabPanel>
                            <TabPanel>
                                <FrameworkScoreChart selectedSchool={this.props.selectedSchool} code="TR" chartService={this.props.chartService}></FrameworkScoreChart>
                            </TabPanel>
                        </div>
                        <div className='col'>
                            <FrameworkScoreChart selectedSchool={this.props.selectedSchool} code="SA" chartService={this.props.chartService}></FrameworkScoreChart>
                        </div>
                    </div>
                </Tabs>
            </div>
        )
    }
}
