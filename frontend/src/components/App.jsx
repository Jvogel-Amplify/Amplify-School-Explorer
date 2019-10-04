import React, { Component } from 'react'
import Schools from './Schools'
import Map from './Map'
import '../styles/App.scss'

export default class App extends React.Component {
    render() {
        const schools = Object.keys(this.props.dataService.rawData)
            .map(key => this.props.dataService.rawData[key])
            .filter(item => item.lat && item.lng)

        return (
            <div id="app">
                <Map schools={schools} />
            </div>
        )
    }
}
