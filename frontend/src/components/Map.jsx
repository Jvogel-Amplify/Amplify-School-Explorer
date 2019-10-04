import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Modal from 'react-modal'
import ImpactPerformanceChart from './ImpactPerformanceChart'
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
        this.setState({ modalIsOpen: true, selectedSchool: id })
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00'
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    render() {
        const SchoolMarkerComponent = ({ text, key, school }) => {
            return <div className="school-marker" onClick={this.openModal.bind(null, school.dbn)}></div>
        }

        const schools = this.props.schools;

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
                    {schools.map(school => {
                        return <SchoolMarkerComponent key={school.dbn} lat={school.lat} lng={school.lng} school={school}/>
                    })}

                </GoogleMapReact>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                <div className="modal-content">
                    <ImpactPerformanceChart 
                        selectedSchool={this.state.selectedSchool} 
                        chartService={this.props.chartService}
                    ></ImpactPerformanceChart>
                </div>
        </Modal>
            </div>
        )
    }
}
