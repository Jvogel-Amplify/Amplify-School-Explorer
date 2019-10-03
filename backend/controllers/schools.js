import axios from 'axios'

export const schoolsController = async (req, res) => {
    try {
        const schools = await axios.get('../data/schools.json')
        res.json(schools)
    } catch (error) {
        res.json(error)
    }

}