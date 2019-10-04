import * as DataService from '../services/data'

export const pullDataController = async (req, res) => {
    try {
        DataService.pullAllData()
        res.json({message: 'Data pulling in progress... Check server logs for details.'})
    } catch (error) {
        res.json({error})
    }
}