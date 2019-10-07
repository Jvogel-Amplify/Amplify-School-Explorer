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
        const transformedFrameworkData = transformFrameworkScoresData(rawData)
        fs.writeFileSync(path.join(__dirname, '../data/frameworkData.json'), JSON.stringify(transformedFrameworkData))
        const districtData = transformDistrictData(rawData)
        fs.writeFileSync(path.join(__dirname, '../data/district.json'), JSON.stringify(districtData))

        console.log('done!')
        Promise.resolve(true)
    } catch (error) {
        console.error(error)
        Promise.reject(error)
    }
}

const transformDistrictData = (rawData) => {
    const results = {
        1: {
            userCount: 0,
            schoolCount: 0,
        },
        2: {
            userCount: 0,
            schoolCount: 0,
        },
        3: {
            userCount: 0,
            schoolCount: 0,
        },
        4: {
            userCount: 0,
            schoolCount: 0,
        },
        5: {
            userCount: 0,
            schoolCount: 0,
        },
        6: {
            userCount: 0,
            schoolCount: 0,
        },
        7: {
            userCount: 0,
            schoolCount: 0,
        },
        8: {
            userCount: 0,
            schoolCount: 0,
        },
        9: {
            userCount: 0,
            schoolCount: 0,
        },
        10: {
            userCount: 0,
            schoolCount: 0,
        },
        11: {
            userCount: 0,
            schoolCount: 0,
        },
        12: {
            userCount: 0,
            schoolCount: 0,
        },
        13: {
            userCount: 0,
            schoolCount: 0,
        },
        14: {
            userCount: 0,
            schoolCount: 0,
        },
        15: {
            userCount: 0,
            schoolCount: 0,
        },
        16: {
            userCount: 0,
            schoolCount: 0,
        },
        17: {
            userCount: 0,
            schoolCount: 0,
        },
        18: {
            userCount: 0,
            schoolCount: 0,
        },
        19: {
            userCount: 0,
            schoolCount: 0,
        },
        20: {
            userCount: 0,
            schoolCount: 0,
        },
        21: {
            userCount: 0,
            schoolCount: 0,
        },
        22: {
            userCount: 0,
            schoolCount: 0,
        },
        23: {
            userCount: 0,
            schoolCount: 0,
        },
        24: {
            userCount: 0,
            schoolCount: 0,
        },
        25: {
            userCount: 0,
            schoolCount: 0,
        },
        26: {
            userCount: 0,
            schoolCount: 0,
        },
        27: {
            userCount: 0,
            schoolCount: 0,
        },
        28: {
            userCount: 0,
            schoolCount: 0,
        },
        29: {
            userCount: 0,
            schoolCount: 0,
        },
        30: {
            userCount: 0,
            schoolCount: 0,
        },
        31: {
            userCount: 0,
            schoolCount: 0,
        },
        32: {
            userCount: 0,
            schoolCount: 0,
        },
        75: {
            userCount: 0,
            schoolCount: 0,
        },
        84: {
            userCount: 0,
            schoolCount: 0,
        }
    }

    Object.keys(rawData).forEach(schoolId => {
        const district = parseInt(schoolId.slice(0, 2))
        const userCount = rawData[schoolId].userCount
        if(userCount) {
            results[district].userCount += parseInt(userCount)
        }
        results[district].schoolCount += 1

    })
    return results
}

/**
 * 
 */
const transformFrameworkScoresData = (rawData) => {
    const results = {
        "CT": {
            "N": 0,
            "A": 0,
            "M": 0, 
            "E": 0
        },
        "ES": {
            "N": 0,
            "A": 0,
            "M": 0, 
            "E": 0
        },
        "RI": {
            "N": 0,
            "A": 0,
            "M": 0, 
            "E": 0
        },
        "SE": {
            "N": 0,
            "A": 0,
            "M": 0, 
            "E": 0
        },
        "SF": {
            "N": 0,
            "A": 0,
            "M": 0, 
            "E": 0
        },
        "TR": {
            "N": 0,
            "A": 0,
            "M": 0, 
            "E": 0
        },
        "SA": {
            "N": 0,
            "A": 0,
            "M": 0, 
            "E": 0
        },
    }

    const frameworkScoreKey = [
        {
            startScore: 1,
            endScore: 1.99,
            category: 'N'
        },
        {
            startScore: 2,
            endScore: 2.99,
            category: 'A'
        },
        {
            startScore: 3,
            endScore: 3.99,
            category: 'M'
        },
        {
            startScore: 4,
            endScore: 4.99,
            category: 'E'
        }
    ]
    

    const scoreInRange = (score, rangeObj) => {
        if (score <= rangeObj.endScore && score >= rangeObj.startScore) {
            return rangeObj.category
        } else {
            return false
        }
    }

    const placeScore = (key, value) => {
        for(let i = 0; i < frameworkScoreKey.length; i++){
            const frameworkScoreObj = frameworkScoreKey[i]
            const category = scoreInRange(value, frameworkScoreObj)
            if(category) {
                results[key][category] += 1
                break
            }
        }
    }

    const frameworkScoreCodes = ["CT", "ES", "RI", "SE", "SF", "TR", "SA"]

    Object.keys(rawData).forEach( schoolId => {
        const dataPoint = rawData[schoolId]
        if(dataPoint.frameworkScores) {
            frameworkScoreCodes.forEach(key => {
                placeScore(key, dataPoint.frameworkScores[key])
            })
        }
    })

    console.log(results)
    return results

}