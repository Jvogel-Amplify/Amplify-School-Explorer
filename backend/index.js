import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import {testController, scrapeDataController} from './controllers'

const app = express()
const port = 9000

// parse incoming requests as json
app.use(bodyParser.json())

// configure routes

app.get('/test', testController)

app.get('/scrape-data', scrapeDataController)

 /**
 * static assets
 */
app.use('/data',
    express.static(
        path.join(__dirname, '/data'),
    ),
)

app.use('/',
    express.static(
        path.join(__dirname, '../frontend/dist'),
    ),
)

// start express
app.listen(port, () => console.log(`App server listening on port ${port}!`))