import React, { Component } from 'react'
import Schools from './Schools'

export default class App extends React.Component {
    render() {
        return (
            <div id="app">
                <aside><Schools /></aside>
                <section>Section</section>
            </div>
        )
    }
}
