import * as DataService from '../services/data'

export const testController = (req, res) => {
    res.sendStatus(200)
}

export const scrapeDataController = async (req, res) => {
    try {
        DataService.scrapeAllData()
        res.json({message: 'Scraping in progress. Check server logs for details.'})
    } catch (error) {
        res.json({error})
    }
}