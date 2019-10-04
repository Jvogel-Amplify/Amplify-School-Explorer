import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Modal from 'react-modal'
import PerformanceImpactChart from './PerformanceImpactChart'
import FrameworkScoresChart from './FrameworkScoresChart'
import HighNeedsChart from './HighNeedsChart'
import EnrollmentChart from './EnrollmentChart'
import RaceChart from './RaceChart'
import School from './School'
import * as lib from '../../../library/'
import '../styles/Map.scss'

Modal.setAppElement('#root')

const customStyles = {
    content : {
      top         : '50%',
      left        : '50%',
      right       : 'auto',
      bottom      : 'auto',
      marginRight : '-50%',
      transform   : 'translate(-50%, -50%)'
    }
}

export default class Map extends React.Component {
    constructor() {
        super()

        this.state = {
            modalIsOpen: false,
            selectedSchool: null
        }

        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal(id) {
        this.setState({
            modalIsOpen: true,
            selectedSchool: id
        })
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00'
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    render() {
        const SchoolMarkerComponent = ({ key, school }) => {
            const markerColor = lib.countToRGB(school.userCount)
            const markerStyle = { 'borderColor': markerColor }
            return (
                <div
                    className="school-marker"
                    style={markerStyle}
                    onClick={this.openModal.bind(null, school.dbn)}
                ></div>
            )
        }

        const schoolsObj = this.props.schools
        const schoolsArr = Object.keys(schoolsObj)
            .map(key => schoolsObj[key])
            .filter(item => item.lat && item.lng)

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCOfFzd3eXuf_2TaTiW_yM5AiVZMUWTYNQ' }}
                    defaultCenter={{
                        lat: 40.73,
                        lng: -73.93
                    }}
                    defaultZoom={10}
                >
                    {schoolsArr.map(school => {
                        return <SchoolMarkerComponent key={school.dbn} lat={school.lat} lng={school.lng} school={school}/>
                    })}

                </GoogleMapReact>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >

                <div className="modal-content">
                    <div className="modal-header">
                        <span className="modal-close" onClick={this.closeModal}>X</span>
                    </div>

                    <School
                        selectedSchool={this.state.selectedSchool}
                        schools={schoolsObj}
                    ></School>
                    <EnrollmentChart 
                        selectedSchool={this.state.selectedSchool} 
                        chartService={this.props.chartService}
                    ></EnrollmentChart>
                    <PerformanceImpactChart 
                        selectedSchool={this.state.selectedSchool} 
                        chartService={this.props.chartService}
                    ></PerformanceImpactChart>
                    <HighNeedsChart 
                        selectedSchool={this.state.selectedSchool} 
                        chartService={this.props.chartService}
                    ></HighNeedsChart>
                    <RaceChart 
                        selectedSchool={this.state.selectedSchool} 
                        chartService={this.props.chartService}
                    ></RaceChart>
                    {/* <FrameworkScoresChart 
                        selectedSchool={this.state.selectedSchool} 
                        chartService={this.props.chartService}
                    ></FrameworkScoresChart> */}
                </div>
        </Modal>
            </div>
        )
    }
}
