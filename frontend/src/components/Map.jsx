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

    

    loadDistrictOverlay(map, maps) {
        const styleArray = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                  "color": "#f5f5f5"
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
                  "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                  "color": "#f5f5f5"
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
              "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                  "color": "#bdbdbd"
                    }
                ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
                "stylers": [
                    {
                  "color": "#eeeeee"
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
                  "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                  "color": "#9e9e9e"
                    }
                ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
                "stylers": [
                    {
                  "color": "#ffffff"
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
              "featureType": "road.arterial",
              "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
              "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                  "color": "#757575"
                    }
                ]
            },
            {
              "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
              "elementType": "labels.text.fill",
                "stylers": [
                    {
                  "color": "#616161"
                    }
                ]
            },
            {
              "featureType": "road.local",
                "stylers": [
                    {
                  "visibility": "off"
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
                  "color": "#9e9e9e"
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
              "featureType": "transit.line",
              "elementType": "geometry",
                "stylers": [
                    {
                  "color": "#e5e5e5"
                    }
                ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                  "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                  "color": "#9e9e9e"
                    }
                ]
            }
        ]
        map.data.loadGeoJson('http://localhost:9000/data/school-districts.geojson')
        // map.data.setStyle({
        //     fillColor: '#4B4C4D',
        //     fillOpacity: .3,
        //     strokeWeight: 2,
        //     strokeOpacity: 1,
        //     strokeColor: '#4B4C4D'
        // })

        // Color each letter gray. Change the color when the isColorful property
        // is set to true.
        map.data.setStyle(function(feature) {
            
            // var color = 'gray';
            // if (feature.getProperty('isColorful')) {
            // color = feature.getProperty('color');
            // }
            return ({
                fillColor: '#4B4C4D',
                fillOpacity: .1,
                strokeWeight: 1,
                strokeOpacity: 8,
                strokeColor: '#4B4C4D'
            });
        });
        
        // When the user clicks, set 'isColorful', changing the color of the letters.
        map.data.addListener('click', function(event) {
            console.log("HEY", event.feature.getProperty('school_dist'))
            
            // event.feature.setProperty('isColorful', true);
        });
        
        // When the user hovers, tempt them to click by outlining the letters.
        // Call revertStyle() to remove all overrides. This will use the style rules
        // defined in the function passed to setStyle()
        map.data.addListener('mouseover', function(event) {
            map.data.revertStyle();
            map.data.overrideStyle(event.feature, {fillOpacity: .5});
        });
        
        map.data.addListener('mouseout', function(event) {
            map.data.revertStyle();
        });

        // map.data.addListener('mouseover', (event) => {
        //     map.data.setStyle({
        //         fillColor: 'white',
        //         fillOpacity: .7,
        //         strokeWeight: 1,
        //         strokeOpacity: .1,
        //         strokeColor: 'white'
        //     })
        // })

        // map.data.addListener('mouseout', (event) => {
        //     map.data.setStyle({
        //         fillColor: 'white',
        //         fillOpacity: .1,
        //         strokeWeight: 1,
        //         strokeOpacity: .3,
        //         strokeColor: 'white'
        //     })
        // })

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
            } else {
                markerStyle['opacity'] = .3
                markerStyle['borderColor'] = 'black'

                markerStyle['fillOpacity'] = .4
                markerStyle['backgroundColor'] = 'white'
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
                    onGoogleApiLoaded={({ map, maps }) => this.loadDistrictOverlay(map, maps)}
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
