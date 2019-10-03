import path from 'path'
import axios from 'axios'
import fs from 'fs'

/**
 * for every year
 *      get impact performance
 *      for every school
 *          get enrollment data
 *          get student population
 *          get framework scores
 *          percentile rank
 */

const baseUrl = 'https://tools.nycenet.edu/dashboard/api/data/dashboard'

const endpoints = {

}

const startYear= 2002
const endYear = 2019

export const scrapeAllData = async () => {
    const baseDir = path.join(__dirname, '../data')

    // Impact performance
    // try {
    //     const response = await axios.get(`${baseUrl}/impact_performance.php`)
    //     const outputDir = path.join(baseDir, '/2018')
    //     if (!fs.existsSync(outputDir)){
    //         fs.mkdirSync(outputDir);
    //     }
    //     fs.writeFileSync(path.join(outputDir, '/impactPerformance.json'), JSON.stringify({data: response.data}))
    //     return Promise.resolve(true)
    // } catch (error) {
    //     console.error(error)
    //     return Promise.reject(error.message)
    // }
    try {
        const schoolsArray = JSON.parse(fs.readFileSync(`${baseDir}/schools.json`))
        const numSchools = schoolsArray.length
    
        for(let year = startYear; year <= endYear; year++) {
            try {
                console.log(`getting data for year: ${year}`)
                const outputDir = path.join(baseDir, `/${year}`)
                if (!fs.existsSync(outputDir)){
                    fs.mkdirSync(outputDir);
                }
                for(let schoolIndex = 0; schoolIndex < numSchools; schoolIndex++){
                    const schoolObj = schoolsArray[schoolIndex]
                    const schoolId = schoolObj.id
                    console.log(`getting data for school ID: ${schoolId}`)
                }
    
            } catch (error) {
                console.error(`Error getting data for year ${year} - ${error}`)
            }
        }
        Promise.resolve(true)
    } catch(error) {
        console.error(error)
        Promise.reject(error.message)
    }

    

}