import fs from 'fs'
import path from 'path'

export const mergeData = async () => {
    let rawData = {}
    try {
        const schools = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/schoolData.json')))
        schools.forEach( (schoolObj) => {
            rawData[schoolObj.dbn] = schoolObj
        })

        const impactPerformance = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/impactPerformance.json')))
        impactPerformance.data.forEach( (impactPerformanceObj) => {
            const id = impactPerformanceObj.dbn
            rawData[id].impact = impactPerformanceObj.impact
            rawData[id].performance = impactPerformanceObj.performance
        })

        Object.keys(rawData).forEach(schoolId => {
            const frameworkScores = JSON.parse(fs.readFileSync(path.join(__dirname, `../data/2018/${schoolId}/framework_scores.json`)))
            rawData[schoolId].frameworkScores = frameworkScores.data[0]

            const enrollment = JSON.parse(fs.readFileSync(path.join(__dirname, `../data/2018/${schoolId}/enrollment.json`)))
            rawData[schoolId].enrollment = enrollment.data

            // const percentileRank = fs.readFileSync(path.join(__dirname, `../data/2018/${schoolId}/percentile_rank.json`))
            // rawData[schoolId].percentileRank = percentileRank.data.data

            const studentPop = JSON.parse(fs.readFileSync(path.join(__dirname, `../data/2018/${schoolId}/student_pop.json`)))
            rawData[schoolId].studentPop = studentPop.data
        })

        const locationData = JSON.parse(fs.readFileSync(path.join(__dirname, `../data/school-locations-17-18.json`)))
        locationData.forEach(locationObj => {
            const schoolId = locationObj["ATS SYSTEM CODE"]
            if(rawData[schoolId]) {
                const coordinates = locationObj["Location 1"].split('\n').pop().replace(/[{()}]/g, '').split(',')
                rawData[schoolId].lat = coordinates[0]
                rawData[schoolId].lng = coordinates[1]
            }
        })

        const amplifyUserCount = JSON.parse(fs.readFileSync(path.join(__dirname, `../data/amplify-school-user-count.json`)))
        amplifyUserCount.forEach(schoolObj => {
            const schoolId = schoolObj.id
            if(rawData[schoolId]) {
                rawData[schoolId].userCount = schoolObj.count_user
            }
        })
        fs.writeFileSync(path.join(__dirname, '../data/mergedData.json'), JSON.stringify(rawData))
        console.log('done!')
        Promise.resolve(true)
    } catch (error) {
        console.error(error)
        Promise.reject(error)
    }
}