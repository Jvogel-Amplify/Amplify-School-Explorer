import React, { Component } from 'react'


export default class DistrictInfo extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        console.log(this.props.district)
    }

    render() {
        
        return (<div id='districtInfo'>{this.props.district}</div>)
    }
}
