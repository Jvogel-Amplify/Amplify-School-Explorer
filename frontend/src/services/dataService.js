import axios from 'axios'
import { toCamelCase } from 'lib'

export default class DataService {

    constructor() {
      this.rawData = {}
      this.headersMap = null
    }

    async fetchData() {
        try {
            const schools = await axios.get('http://localhost:9000/data/schoolData.json')
            schools.data.forEach( (schoolObj) => {
                this.rawData[schoolObj.dbn] = schoolObj
            })

            const impactPerformance = await axios.get('http://localhost:9000/data/impactPerformance.json')
            impactPerformance.data.data.forEach( (impactPerformanceObj) => {
                const id = impactPerformanceObj.dbn
                this.rawData[id].impact = impactPerformanceObj.impact
                this.rawData[id].performance = impactPerformanceObj.performance
            })

            // await Object.keys(this.rawData).forEach(async schoolId => {
            //     const frameworkScores = await axios.get(`http://localhost:9000/data/2018/${schoolId}/framework_scores.json`)
            //     this.rawData[schoolId].frameworkScores = frameworkScores.data.data[0]

            //     const enrollment = await axios.get(`http://localhost:9000/data/2018/${schoolId}/enrollment.json`)
            //     this.rawData[schoolId].enrollment = enrollment.data.data

            //     const percentileRank = await axios.get(`http://localhost:9000/data/2018/${schoolId}/percentile_rank.json`)
            //     this.rawData[schoolId].percentileRank = percentileRank.data.data

            //     const studentPop = await axios.get(`http://localhost:9000/data/2018/${schoolId}/student_pop.json`)
            //     this.rawData[schoolId].studentPop = studentPop.data.data
            // })

            const locationData = await axios.get(`http://localhost:9000/data/school-locations-17-18.json`)
            locationData.data.forEach(locationObj => {
                const schoolId = locationObj["ATS SYSTEM CODE"]
                if(this.rawData[schoolId]) {
                    const coordinates = locationObj["Location 1"].split('\n').pop().replace(/[{()}]/g, '').split(',')
                    this.rawData[schoolId].lat = coordinates[0]
                    this.rawData[schoolId].lng = coordinates[1]
                }
            })

            const amplifyUserCount = await axios.get(`http://localhost:9000/data/amplify-school-user-count.json`)
            amplifyUserCount.data.forEach(schoolObj => {
                const schoolId = schoolObj.id
                if(this.rawData[schoolId]) {
                    this.rawData[schoolId].userCount = schoolObj.count_user
                }
            })

            Promise.resolve(true)
        } catch (error) {
            console.error(error)
            Promise.reject(error)
        }
    }

    getRawData() {
        if (this.rawData){
            return this.rawData
        } else {
            throw new Error('Must fetch data first')
        }
    }

    getPerformanceImpactData() {
        if (this.rawData){
            const filteredData = Object.keys(this.rawData).map( (id) => {
                const schoolObj = this.rawData[id] 
                return [schoolObj.dbn, schoolObj.performance, schoolObj.impact]
            })
            return filteredData
        } else {
            throw new Error('Must fetch data first')
        }
    }

    // getRawDataWithWhereClause(columnName, columnValue) {
    //     const columnIndex = this.headersMap[toCamelCase(columnName)]
    //     return this.getRawData().filter(
    //         dataPoint => {
    //             if (dataPoint[columnIndex] === columnValue) {
    //                 return true
    //             }
    //         })
    // }

    // getFilteredColumnData(colSet){
    //     const rawData = this.getRawData()
    //     const data = rawData.slice(1)
    //     const formattedData = data.map((dataRow) => {
    //         let filteredRow = []
    //         for(let i = 0; i < dataRow.length; i ++){
    //             if(colSet.includes(i)) {
    //                 filteredRow.push(dataRow[i])
    //             }
    //         }
    //         return filteredRow
    //     })
    //     return formattedData
    // }

    // getCategoriesForColumn(columnName){
    //     const columnIndex = this.headersMap[toCamelCase(columnName)]
    //     const data = this.rawData.slice(1)
    //     const formattedData = data.map((dataRow) => {
    //         return dataRow[columnIndex]
    //     })
    //     const categories = new Set(formattedData)
    //     return categories
    // }

    // getActiveData(){
    //     const rawData = this.getRawData()
    //     const headers = rawData[0]
    //     const data = rawData.slice(1)
    //     const formattedData = data.filter((listing) => {
    //         return (listing[3] === 'true')
    //     }).map( (listing) => {
    //         const result = {}
    //         headers.map((header, index) => {
    //             result[header] = listing[index]
    //         })
    //         return result
    //     })
    //     return formattedData
    // }

    // getData() {
    //     const rawData = this.getRawData()
    //     const headers = rawData[0]
    //     const data = rawData.slice(1)
    //     const formattedData = data.map( (listing) => {
    //         const result = {}
    //         headers.map((header, index) => {
    //             result[header] = listing[index]
    //         })
    //         return result
    //     })
    //     return formattedData
    // }

    // getRow(id) {
    //     const rawData = this.getRawData()
    //     for(let i = 0; i < rawData.length; i++){
    //         if(rawData[i][0] === id){
    //             return rawData[i]
    //         }
    //     }
    //     return null
    // }

    // getValueAtColumn(dataPoint, columnHeader) {
    //     return dataPoint[this.headersMap[toCamelCase(columnHeader)]]
    // }

}