import path from 'path'
import axios from 'axios'
import fs from 'fs'
import config from '../config'

const createPath = (path) => {
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}

const pullEndpointData = async (schoolId, year, endpoint, formData, outputFile) => {
    const response = await axios(
        {
            method: 'post',
            url: endpoint,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }
    )
    return Promise.resolve(response.data)
}

const pullDataForYear = async (schoolsArray, year, outputDir) => {
    const numSchools = schoolsArray.length
    for(let schoolIndex = 0; schoolIndex < numSchools; schoolIndex++){
        const schoolObj = schoolsArray[schoolIndex]
        const schoolId = schoolObj.dbn
        try {
            const schoolIdDir = path.join(outputDir, `/${schoolId}`)
            createPath(schoolIdDir)

            const formData = `dbn=${encodeURIComponent(schoolId)}&report_type=${encodeURIComponent(schoolObj["report_type"])}&report_year=${encodeURIComponent(year)}`


            const endpoints = [
                '/enrollment',
                '/student_pop',
                '/framework_scores',
                '/percentile_rank',
            ]

            const statsArray = await Promise.all(endpoints.map(async endpoint => {
                const stats = {
                    newData: true,
                    containsData: true,
                }
                const outputFile = path.join(schoolIdDir, `${endpoint}.json`)
                let data = []
                if(fs.existsSync(outputFile)){
                    console.log(`Data for ${schoolId} in ${year} already exists : ${endpoint}`)
                    stats.newData = false
                } else {
                    data = await pullEndpointData(schoolId, year, `${config.data.baseUrl}${endpoint}.php`, formData, outputFile)
                    if(data.length === 0){
                        console.log(`No data for: ${schoolId} in ${year} from ${endpoint}`)
                        stats.containsData = false
                    } else {
                        console.log(`Got data for: ${schoolId} in ${year} from ${endpoint}`)
                    }
                    fs.writeFileSync(outputFile, JSON.stringify({data}))
                }
                return Promise.resolve(stats)
            }))
        } catch (error) {
            console.error(`Error getting data for school ${schoolId}- ${error}`)
        }
    }
    Promise.resolve(true)
}

export const pullAllData = async () => {
    const dataDir = path.join(__dirname, '../data')
    // Impact performance
    try {
        const outputDir = path.join(dataDir, '/2018')
        createPath(outputDir)
        const output = path.join(outputDir, '/impactPerformance.json')
        if(fs.existsSync(output)){
            console.log(`Impact performance data already exists`)
        } else {
            const response = await axios.get(`${config.data.baseUrl}/impact_performance.php`)
            fs.writeFileSync(output, JSON.stringify({data: response.data}))
        }
    } catch (error) {
        console.error(`Error scraping impact performance data - ${error}`)
        return Promise.reject(error.message)
    }
    // Other data 
    try {
        const schoolsArray = JSON.parse(fs.readFileSync(`${dataDir}/schoolData.json`))    
        for(let year = config.data.startYear; year <= config.data.endYear; year++) {
            try {
                const outputDir = path.join(dataDir, `/${year}`)
                createPath(outputDir)
                await pullDataForYear(schoolsArray, year, outputDir)
    
            } catch (error) {
                console.error(`Error getting data for year ${year} - ${error}`)
            }
        }
        console.log('done!')
        Promise.resolve(true)
    } catch(error) {
        console.error(error)
        Promise.reject(error.message)
    }
}