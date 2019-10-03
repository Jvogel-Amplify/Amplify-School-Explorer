import './styles/index.scss'
import MapsService from './services/mapsService'
import ChartService from './services/chartService'
import DataService from './services/dataService'
import {GoogleCharts} from 'google-charts'

const mapElement = document.getElementById('map')
const dataService = new DataService()
const chartService = new ChartService(dataService)
const mapsService = new MapsService(mapElement, chartService, dataService)
chartService.setMapService(mapsService)

const init = window.init = async() => {
    await dataService.setRawData('http://localhost:9000/static/cleanedData.csv')
    // init map with active data
    mapsService.initMap(dataService.getActiveData())

    // init charts
    const chartWrapper = document.getElementById('charts-wrapper')
    chartService.displayCharts(chartWrapper)

    // set up action listeners
    window.addEventListener('focus-neighborhood', (event) => {
        mapsService.highlightNeighborhood(event.detail)
    })
    window.addEventListener('toggle', (event) => {
        chartService.toggleChart(event.detail, chartWrapper)
    })

    const clearFocusButton = document.getElementById('clear-focus')
    clearFocusButton.addEventListener('click', () => {
        mapsService.clearFocus()
    })
}

mapsService.loadGoogleMapsAPI('init')
