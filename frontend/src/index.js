import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import DataService from './services/dataService'

const init = async () => {
    const dataService = new DataService()
    const data = await dataService.fetchData()

    ReactDOM.render(
        <App dataService={dataService} />,
        document.getElementById('root')
    )
}

init()

