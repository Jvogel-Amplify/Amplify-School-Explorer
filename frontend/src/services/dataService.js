import axios from 'axios'
import { toCamelCase } from 'lib'

export default class DataService {

    constructor() {
      this.rawData = {}
      this.frameworkData = {}
      this.districtData = {}
      this.headersMap = null
    }

    async fetchData() {
        try {
            const response = await axios.get('http://localhost:9000/data/mergedData.json')
            const response2 = await axios.get('http://localhost:9000/data/frameworkData.json')
            const response3 = await axios.get('http://localhost:9000/data/district.json')
            this.rawData = response.data
            this.frameworkData = response2.data
            this.districtData = response3.data

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

    getHighNeedsData(id) {
        if (this.rawData){
            const studentPopData = this.rawData[id].studentPop
            const filteredData = studentPopData.filter( (dataPoint) => {
                return dataPoint.met_group === "Higher-Need Students"
            }).map( dataPoint => {
                const {metric_name_disp, value, value_district, value_city} = dataPoint
                return [metric_name_disp, value, value_district, value_city]
            })
            return filteredData
        } else {
            throw new Error('Must fetch data first')
        }
    }

    getRaceData(id) {
        if (this.rawData){
            const studentPopData = this.rawData[id].studentPop
            const filteredData = studentPopData.filter( (dataPoint) => {
                return dataPoint.met_group === "Race"
            }).map( dataPoint => {
                const {metric_name_disp, value, value_district, value_city} = dataPoint
                return [metric_name_disp, value, value_district, value_city]
            })
            return filteredData
        } else {
            throw new Error('Must fetch data first')
        }
    }

    getEnrollmentData(id) {
        if (this.rawData){
            const enrollmentData = this.rawData[id].enrollment
            const filteredData = enrollmentData.map( dataPoint => {
                const {grade, value} = dataPoint
                return [grade, value]
            })
            return filteredData
        } else {
            throw new Error('Must fetch data first')
        }
    }

    getFrameworkScoresData(scoreCode) {
        if (this.rawData){
            const filteredData = Object.keys(this.rawData).filter( (id) => {
                return this.rawData[id].frameworkScores
            }).map( (id) => {
                const schoolObj = this.rawData[id] 
                const scoreValue = schoolObj.frameworkScores[scoreCode]
                return [schoolObj.dbn, scoreValue]
                
            })
            return filteredData
        } else {
            throw new Error('Must fetch data first')
        }
    }

    getRawFrameworkData(scoreCode) {
        if (this.frameworkData){
            return Object.keys(this.frameworkData[scoreCode]).map(key => {
                return [key, this.frameworkData[scoreCode][key]]
            })
        } else {
            throw new Error('Must fetch data first')
        }
    }

    getDistrictData(district){
        return this.districtData[district]
    }
}