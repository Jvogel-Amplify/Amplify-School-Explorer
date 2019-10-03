import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import { schoolsController } from './controllers/schools'

const app = express()
const port = 9000

// parse incoming requests as json
app.use(bodyParser.json())

// configure routes
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