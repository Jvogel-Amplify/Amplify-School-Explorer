import React, { Component } from 'react'
import '../styles/School.scss'

export default class School extends React.Component {
    getAmplifyCount(count) {
        if (count) {
            return (
                <div className="amplify-count">
                    <span className="count">{count}</span>
                    <span>Users</span>
                </div>
            )
        }
    }

    getPerformance(performance) {
        if (performance) {
            return <span><strong>Performance:</strong> {performance}<br></br></span>
        }
    }

    getImpact(impact) {
        if (impact) {
            return <span><strong>Impact:</strong> {impact}<br></br></span>
        }
    }

    render() {
        const slectedSchool = this.props.selectedSchool
        const school = this.props.schools[slectedSchool]

        return (
            <div className="school-details">
                <h1>{school.school}</h1>
                <p>
                    <strong>Principal:</strong> {school.principal}<br></br>
                    <strong>Superintendent:</strong> {school.superintendent}<br></br>
                    <strong>School Type:</strong> {school.school_type}<br></br>
                    {this.getPerformance(school.performance)}
                    {this.getImpact(school.impact)}
                </p>
                {this.getAmplifyCount(school.userCount)}
            </div>
        )
    }
}
