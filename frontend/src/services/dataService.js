import axios from 'axios'
import csv from 'jquery-csv'
import { toCamelCase } from 'lib'

export default class DataService {

    constructor() {
      this.rawData = null
      this.headersMap = null
    }

    async setRawData(pathToData) {
        try {
            const csvFile = await axios.get(pathToData)
            const data = csv.toArrays(csvFile.data)
            this.rawData = data

            const headers = this.rawData[0]
            const headersMap = {}
            for(let i = 0; i < headers.length; i++){
                headersMap[toCamelCase(headers[i])] = i
            }
            this.headersMap = headersMap
        } catch(error){
            console.log('Could not initialize data', error)
        }
    }
    
    getRawData() {
        if (this.rawData){
            return this.rawData
        } else {
            throw new Error('Must fetch data first')
        }
    }

    getRawDataWithWhereClause(columnName, columnValue) {
        const columnIndex = this.headersMap[toCamelCase(columnName)]
        return this.getRawData().filter(
            dataPoint => {
                if (dataPoint[columnIndex] === columnValue) {
                    return true
                }
            })
    }

    getFilteredColumnData(colSet){
        const rawData = this.getRawData()
        const data = rawData.slice(1)
        const formattedData = data.map((dataRow) => {
            let filteredRow = []
            for(let i = 0; i < dataRow.length; i ++){
                if(colSet.includes(i)) {
                    filteredRow.push(dataRow[i])
                }
            }
            return filteredRow
        })
        return formattedData
    }

    getCategoriesForColumn(columnName){
        const columnIndex = this.headersMap[toCamelCase(columnName)]
        const data = this.rawData.slice(1)
        const formattedData = data.map((dataRow) => {
            return dataRow[columnIndex]
        })
        const categories = new Set(formattedData)
        return categories
    }

    getActiveData(){
        const rawData = this.getRawData()
        const headers = rawData[0]
        const data = rawData.slice(1)
        const formattedData = data.filter((listing) => {
            return (listing[3] === 'true')
        }).map( (listing) => {
            const result = {}
            headers.map((header, index) => {
                result[header] = listing[index]
            })
            return result
        })
        return formattedData
    }   
    
    getData() {
        const rawData = this.getRawData()
        const headers = rawData[0]
        const data = rawData.slice(1)
        const formattedData = data.map( (listing) => {
            const result = {}
            headers.map((header, index) => {
                result[header] = listing[index]
            })
            return result
        })
        return formattedData 
    }

    getRow(id) {
        const rawData = this.getRawData()
        for(let i = 0; i < rawData.length; i++){
            if(rawData[i][0] === id){
                return rawData[i]
            }
        }
        return null
    }

    getValueAtColumn(dataPoint, columnHeader) {
        return dataPoint[this.headersMap[toCamelCase(columnHeader)]]
    }

}