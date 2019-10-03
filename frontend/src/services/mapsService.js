import axios from 'axios'
import Handlebars from 'handlebars'
import {toTimestamp, percentToRGB, addScript} from 'lib'

export default class GoogleMapsService {
    constructor(mapElement, chartService, dataService) {
        this.mapElement = mapElement
        this.chartService = chartService
        this.map = null
        this.markerList = null
        this.dataService = dataService
    }

    async loadGoogleMapsAPI(callback) {
        try {
            addScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCOfFzd3eXuf_2TaTiW_yM5AiVZMUWTYNQ&libraries=visualization&callback=${callback}`)
        } catch (error) {
            console.error(`ERROR LOADING GOOGLE MAPS API: ${error}`)
        }
    }

    createIcon(options) {
        return {
            path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
            fillOpacity: options.fillOpacity || 0.6,
            anchor: new google.maps.Point(0,0),
            strokeWeight: options.strokeWeight || 2,
            scale: options.scale || 0.4,
            strokeOpacity: options.strokeOpacity || .3,
            fillColor: options.fillColor || '#778899',
            strokeColor: options.strokeColor || '#000000',
        }
    }

    createMarker(dataPoint, icon, map){
        const [lat, lng] = dataPoint.geopoint.split(':') || []
        return new google.maps.Marker({
            id: dataPoint["Listing ID"],
            url: dataPoint["URL"],
            position: new google.maps.LatLng(lat, lng),
            rent: dataPoint["Rent"],
            icon: icon,
            clickable: true,
            url: dataPoint["URL"],
            deposit: dataPoint["Deposit"],
            roomLeaseDuration: dataPoint["Lease Duration"],
            roomLeaseDurationMax: dataPoint["Max Lease Duration"],
            neighborhood: dataPoint["Neighborhood"],
            bedrooms: dataPoint["Bedrooms"],
            bathrooms: dataPoint["Bathrooms"],
            totalOccupants: dataPoint["Occupants"],
            map: map
        });
    }

    initMap (data) {
        const map = new google.maps.Map(this.mapElement, {
            zoom: 13,
            center: { lat: 40.671704, lng: -73.927169 }
        })
    
        console.log(`adding ${data.length} listings to the map`)
        const markerList = []
        // set up icons, Markers, Layers, InfoWIndows, and listeners
        for (let i = 0; i < data.length; i++) {
            const dataPoint = data[i]
    
            const icon = this.createIcon({
                fillColor: percentToRGB(dataPoint["Rent"])
            })

            const iconLarge = this.createIcon({
                fillColor: percentToRGB(dataPoint["Rent"]),
                scale: .75,
            })
    
            const marker = this.createMarker(dataPoint, icon, map)

            markerList.push(marker)
    
            const transitLayer = new google.maps.TransitLayer()
            transitLayer.setMap(map);
    
            const handleMarkerClick = () => {
                infoWindow.open(map, marker);
            }

            const detailViewSource = document.getElementById('detail-template').innerHTML
            const template = Handlebars.compile(detailViewSource)

            const infoWindow = new google.maps.InfoWindow({
                content: template(marker)
            });
            
            const handleMarkerMouseover = () => {
                if(marker.icon.fillColor !== '#778899') {
                    marker.setIcon(iconLarge)
                }
            }
            
            const handleMarkerMouseout = () => {
                if(marker.icon.fillColor !== '#778899') {
                    marker.setIcon(icon)
                }
            }
    
            google.maps.event.addListener(marker, 'click', handleMarkerClick)
    
            google.maps.event.addListener(marker, 'mouseover', handleMarkerMouseover)
    
            google.maps.event.addListener(marker, 'mouseout', handleMarkerMouseout)
        }
        this.markerList = markerList
    }

    highlightDataPoint(highlightDataPoint){
        if (this.dataService.getValueAtColumn(highlightDataPoint, 'isListingActive')) {
            if (this.markerList) {
                const greyIcon = this.createIcon({fillOpacity: 0.3})
                for(let i = 0; i < this.markerList.length; i++){
                    const marker = this.markerList[i]
                    if(marker.id === this.dataService.getValueAtColumn(highlightDataPoint, 'Listing ID')){
                        console.log(marker)
                        const dataPointRent = this.dataService.getValueAtColumn(highlightDataPoint, 'Rent')
                        const iconLarge = this.createIcon({scale: 0.75, fillColor: percentToRGB(dataPointRent)})
                        marker.setIcon(iconLarge)
                    } else {
                        marker.setIcon(greyIcon)
                    }
                }
            } else {
                throw new Error('map not initialized')
            }
        } else {
            console.log('selected data point is not active')
        }
    }

    highlightNeighborhood(neighborhood){
        if (this.markerList) {
            const greyIcon = this.createIcon({fillOpacity: 0.3})
            for(let i = 0; i < this.markerList.length; i++){
                const marker = this.markerList[i]
                if(marker.neighborhood === neighborhood){
                    const icon = this.createIcon({
                        fillColor: percentToRGB(marker.rent)
                    })
                    marker.setIcon(icon)
                } else {
                    marker.setIcon(greyIcon)
                }
            }
        } else {
            throw new Error('map not initialized')
        }
    }

    clearFocus(){
        if (this.markerList) {
            for(let i = 0; i < this.markerList.length; i++){
                const marker = this.markerList[i]
                const icon = this.createIcon({
                    fillColor: percentToRGB(marker.rent)
                })
                marker.setIcon(icon)
            }
        } else {
            throw new Error('map not initialized')
        }
    }
}