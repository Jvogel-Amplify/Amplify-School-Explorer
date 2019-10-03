import * as DataService from '../services/data'

export const testController = (req, res) => {
    res.sendStatus(200)
}

export const scrapeDataController = async (req, res) => {
    try {
        await DataService.scrapeAllData()
        res.sendStatus(200)
    } catch (error) {
        res.json({error})
    }
}