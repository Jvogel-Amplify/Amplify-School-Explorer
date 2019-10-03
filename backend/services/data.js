import path from 'path'
import axios from 'axios'
import fs from 'fs'

const baseUrl = 'https://tools.nycenet.edu/dashboard/api/data/dashboard'

const startYear= 2018
const endYear = 2018

const scrapeEndpointData = async (schoolId, year, endpoint, formData, outputFile) => {
    
    if(fs.existsSync(outputFile)){
        console.log(`data for ${schoolId} in ${year} already exists`)
    } else {
        const response = await axios(
            {
                method: 'post',
                url: endpoint,
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }
        )
        
        if(response.data.length > 0){
            fs.writeFileSync(outputFile, JSON.stringify({data: response.data}))
        } else {
            console.log(`No data for: ${schoolId} in ${year} from ${endpoint}`)
        }
    }
}

const scrapeDataForYear = async (schoolsArray, year, outputDir) => {
    console.log(`getting data for year: ${year}`)
    const numSchools = schoolsArray.length
    for(let schoolIndex = 0; schoolIndex < numSchools; schoolIndex++){
        const schoolObj = schoolsArray[schoolIndex]
        const schoolId = schoolObj.dbn
        try {
            const schoolIdDir = path.join(outputDir, `/${schoolId}`)
            if (!fs.existsSync(schoolIdDir)){
                fs.mkdirSync(schoolIdDir);
            }

            const formData = `dbn=${encodeURIComponent(schoolId)}&report_type=${encodeURIComponent(schoolObj["report_type"])}&report_year=${encodeURIComponent(year)}`

            const enrollmentOutputFile = path.join(schoolIdDir, '/enrollment.json')
            await scrapeEndpointData(schoolId, year, `${baseUrl}/enrollment.php`, formData, enrollmentOutputFile)

            const studentPopOutputFile = path.join(schoolIdDir, '/student_pop.json')
            await scrapeEndpointData(schoolId, year, `${baseUrl}/student_pop.php`, formData, studentPopOutputFile)

            const frameworkScoresOutputFile = path.join(schoolIdDir, '/framework_scores.json')
            await scrapeEndpointData(schoolId, year, `${baseUrl}/framework_scores.php`, formData, frameworkScoresOutputFile)

            const percentileRankOutputFile = path.join(schoolIdDir, '/percentile_rank.json')
            await scrapeEndpointData(schoolId, year, `${baseUrl}/percentile_rank.php`, formData, percentileRankOutputFile)

        } catch (error) {
            console.error(`Error getting data - ${error}`)
        }
    }
}

export const scrapeAllData = async () => {
    const baseDir = path.join(__dirname, '../data')

    // Impact performance
    try {
        const outputDir = path.join(baseDir, '/2018')
            if (!fs.existsSync(outputDir)){
                fs.mkdirSync(outputDir);
            }
        const output = path.join(outputDir, '/impactPerformance.json')
        if(fs.existsSync(output)){
            console.log(`Impact performance data already exists`)
        } else {
            const response = await axios.get(`${baseUrl}/impact_performance.php`)
            fs.writeFileSync(output, JSON.stringify({data: response.data}))
        }
    } catch (error) {
        console.error(`Error scraping impact performance data - ${error}`)
        return Promise.reject(error.message)
    }
    // Other data 
    try {
        const schoolsArray = JSON.parse(fs.readFileSync(`${baseDir}/schoolData.json`))    
        for(let year = startYear; year <= endYear; year++) {
            try {
                const outputDir = path.join(baseDir, `/${year}`)
                if (!fs.existsSync(outputDir)){
                    fs.mkdirSync(outputDir);
                }
                await scrapeDataForYear(schoolsArray, year, outputDir)
    
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