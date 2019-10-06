import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Modal from 'react-modal'
import PerformanceImpactChart from './PerformanceImpactChart'
import FrameworkScoresChart from './FrameworkScoresChart'
import HighNeedsChart from './HighNeedsChart'
import EnrollmentChart from './EnrollmentChart'
import RaceChart from './RaceChart'
import School from './School'
import Filters from './Filters'
import * as lib from '../../../library/'
import '../styles/Map.scss'

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

export default class Map extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            modalIsOpen: false,
            selectedSchool: null,
            schools: props.schools,
            filtered: props.schools,
            allowed: []
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal(id) {
        this.setState({
            modalIsOpen: true,
            selectedSchool: id
        })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    filterMap(key) {
        const allowed = this.state.allowed
        allowed.push(key)

        this.setState({
            allowed
        })

        const filtered = Object.keys(this.props.schools)
            .filter(key => this.state.allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = this.props.schools[key];
                return obj;
            }, {});

        this.setState({
            filtered
        })
    }

    

    handleApiLoaded(map, maps) {
        const styleArray = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#181818"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1b1b1b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8a8a8a"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#373737"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3c3c3c"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3d3d3d"
                    }
                ]
            }
        ]
        map.data.loadGeoJson('http://localhost:9000/data/school-districts.geojson')
        map.data.setStyle({
            fillColor: 'white',
            fillOpacity: .1,
            strokeWeight: 1,
            strokeOpacity: .3,
            strokeColor: 'white'
        })
        map.setOptions({
            styles: styleArray
        })
    }

    render() {
        const SchoolMarkerComponent = ({ key, school }) => {
            const markerColor = lib.countToRGB(school.userCount)
            const markerStyle = { backgroundColor: markerColor, borderColor: markerColor, strokeWeight: 1 }

            if (school.userCount) {
                markerStyle['opacity'] = 1
            }

            return (
                <div
                    className="school-marker"
                    style={markerStyle}
                    onClick={this.openModal.bind(null, school.dbn)}
                ></div>
            )
        }

        const schoolsObj = this.state.filtered
        const filteredArr = Object.keys(schoolsObj)
            .map(key => schoolsObj[key])
            .filter(item => item.lat && item.lng)

        const schoolsArr = Object.keys(this.state.schools)
            .map(key => this.state.schools[key])
            .filter(item => item.lat && item.lng)

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <Filters schools={schoolsArr} filterMap={this.filterMap.bind(this)} />
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCOfFzd3eXuf_2TaTiW_yM5AiVZMUWTYNQ' }}
                    defaultCenter={{
                        lat: 40.73,
                        lng: -73.93
                    }}
                    defaultZoom={11}
                    yesIWantToUseGoogleMapApiInternals
                    //styles={styleArray}
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                >
                    {filteredArr.map(school => {
                        return <SchoolMarkerComponent key={school.dbn} lat={school.lat} lng={school.lng} school={school} />
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
                            <span className="modal-close" onClick={this.closeModal}></span>
                        </div>

                        <School
                            selectedSchool={this.state.selectedSchool}
                            schools={schoolsObj}
                        ></School>
                        <div className='charts-wrapper'>
                            <div className='row'>
                                <EnrollmentChart
                                    selectedSchool={this.state.selectedSchool}
                                    chartService={this.props.chartService}
                                ></EnrollmentChart>
                                <RaceChart
                                    selectedSchool={this.state.selectedSchool}
                                    chartService={this.props.chartService}
                                ></RaceChart>
                            </div>
                            <div className='row'>
                                <PerformanceImpactChart
                                    selectedSchool={this.state.selectedSchool}
                                    chartService={this.props.chartService}
                                ></PerformanceImpactChart>
                                <HighNeedsChart
                                    selectedSchool={this.state.selectedSchool}
                                    chartService={this.props.chartService}
                                ></HighNeedsChart>
                            </div>
                            <FrameworkScoresChart
                                selectedSchool={this.state.selectedSchool}
                                chartService={this.props.chartService}
                            ></FrameworkScoresChart>

                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
