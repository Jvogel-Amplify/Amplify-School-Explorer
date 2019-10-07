import React, { Component } from 'react'
import Schools from './Schools'
import Map from './Map'
import '../styles/App.scss'

export default class App extends React.Component {
    render() {
        const schools = this.props.dataService.rawData

        return (
            <div id="app">
                <Map schools={schools} dataService={this.props.dataService} chartService={this.props.chartService}/>
            </div>
        )
    }
}
