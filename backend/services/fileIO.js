import fs from 'fs'
import path from 'path'

import config from '../config.js'

const { pathToData, pathToStatic } = config

export const writeCSV = (output) => {
    try {
        let csv = ''
        for (let index in output) {
            const row = output[index]
            const stringRow = row.join(',') + '\n'
            csv+= stringRow
        }
        fs.writeFileSync(path.join(__dirname, `${pathToStatic}/cleanedData.csv`), csv)
        return Promise.resolve(true)
    } catch (error) {
        return Promise.reject(error)
    }
    
}

export const makeDirectory = (filePath) => {
    try {
        fs.mkdirSync(filePath)
        return Promise.resolve(true)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const removeDirectory = (filePath) => {
    try {
        fs.rmdirSync(filePath)
        return Promise.resolve(true)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const writeFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, data)
        return Promise.resolve(true)
    } catch (error) {
        return Promise.reject(error)
    }
    
}

export const fileExists = async (filePath, callback) => {
    return fs.stat(filePath, callback)
}