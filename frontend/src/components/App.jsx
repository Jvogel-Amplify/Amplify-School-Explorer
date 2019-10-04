import React, { Component } from 'react'
import Schools from './Schools'
import Map from './Map'
import '../styles/App.scss'

export default class App extends React.Component {
    render() {
        const schools = [{
            id: '1',
            name: 'A',
            lat: 40.73,
            lng: -73.93,
        },{
            id: '2',
            name: 'B',
            lat: 40.83,
            lng: -73.83,
        },{
            id: '3',
            name: 'C',
            lat: 40.63,
            lng: -73.83,
        }]

        return (
            <div id="app">
                <Map schools={schools} />
            </div>
        )
    }
}
