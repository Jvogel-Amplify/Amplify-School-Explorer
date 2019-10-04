import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import DataService from './services/dataService'
import ChartService from './services/chartService'

const init = async () => {
    const dataService = new DataService()
    const chartService = new ChartService(dataService)

    await dataService.fetchData()

    chartService.init(() => {
        ReactDOM.render(
            <App dataService={dataService} />,
            document.getElementById('root')
        )
    })
}

init()

