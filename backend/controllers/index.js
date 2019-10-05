import * as DataService from '../services/data'
import {mergeData} from '../services/dataMerge'


export const pullDataController = async (req, res) => {
    try {
        DataService.pullAllData()
        res.json({message: 'Data pulling in progress... Check server logs for details.'})
    } catch (error) {
        res.json({error})
    }
}

export const mergeDataController = async (req, res) => {
    try {
        await mergeData()
        res.json({message: 'Data merging in progress... Check server logs for details.'})
    } catch (error) {
        res.json({error})
    }
}