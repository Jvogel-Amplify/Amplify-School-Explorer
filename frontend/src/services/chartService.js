import { GoogleCharts } from 'google-charts'
import { toSnakeCase, toCamelCase } from 'lib'

export default class ChartService {
    constructor(dataService) {
        this.dataService = dataService
        this.mapService = null
        this.state = {}
    }

    init(callback) {
        GoogleCharts.load(
            () => {
                this.init = true
                callback()
            }
        )
    }

    setMapService(mapService){
        this.mapService = mapService
    }

    drawHighNeeds(elementId, selectedSchoolId) {
        const element = document.getElementById(elementId)
        const data = this.dataService.getHighNeedsData(selectedSchoolId)
        const gData = new google.visualization.DataTable()
        gData.addColumn('string', 'Higher Need Student Category') // met_group / metric_name_disp
        gData.addColumn('number', 'School') // value
        gData.addColumn('number', 'District') // value_district
        gData.addColumn('number', 'City') // value_city
        //gData.addColumn({'type': 'string', 'role': 'style'})

        data.forEach((row) => {
            //row.push('#0000ff')
            gData.addRow(row)
        });

        const options = {
            title: `Higher-Need Students`,
            hAxis: {title: 'Percentage', format:'#%'},
            colors:['#8F2261','#76787B', '#4B4C4D'],
        };

        const chart = new google.visualization.BarChart(element);
        chart.draw(gData, options)
    }

    drawRace(elementId, selectedSchoolId) {
        const element = document.getElementById(elementId)
        const data = this.dataService.getRaceData(selectedSchoolId)
        const gData = new google.visualization.DataTable()
        gData.addColumn('string', 'Racial Demographics')
        gData.addColumn('number', 'School') 
        gData.addColumn('number', 'District')
        gData.addColumn('number', 'City') 
        //gData.addColumn({'type': 'string', 'role': 'style'})

        data.forEach((row) => {
            //row.push('#0000ff')
            gData.addRow(row)
        });

        const options = {
            title: `Racial Demographics`,
            hAxis: { title: 'Percentage', format:'#%'},
            colors:['#8F2261','#76787B', '#4B4C4D'],
        };

        const chart = new google.visualization.BarChart(element);
        chart.draw(gData, options)
    }

    drawEnrollment(elementId, selectedSchoolId) {
        const element = document.getElementById(elementId)
        const data = this.dataService.getEnrollmentData(selectedSchoolId)
        const gData = new google.visualization.DataTable()
        gData.addColumn('string', 'Grade')
        gData.addColumn('number', 'Number of Students') 
        //gData.addColumn({'type': 'string', 'role': 'style'})

        const options = {
            title: 'Student Enrollment',
            legend: { position: 'none' },
            hAxis: { title: 'Number of Students', minValue: 0},
            vAxis: { title: 'Grade Level'},
            colors: ['#8F2261'],
        }
        data.forEach((row) => {
            if(row[0] === "Total"){
                options.title = `Student Enrollment (${row[1]} Total Students)`
            } else {
                gData.addRow(row)
            }
        });

        const chart = new google.visualization.BarChart(element);
        chart.draw(gData, options)
    }

    // drawAllFrameworkScores(elementWrapperId, selectedSchoolId) {
    //     const elementWrapper = document.getElementById(elementWrapperId)

    //     const frameworkScoreCodes = ["CT"]

    //     const frameworkScoreCodeMap = {
    //         "CT": "Collaborative Teachers",
    //         "ES": "Effective School Leadership",
    //         "RI": "Rigorous Instruction",
    //         "SE": "Supportive Environment",
    //         "SF": "Strong Family-Community Ties",
    //         "TR": "Trust",
    //         "SA": "Student Achievement",
    //     }


    //     frameworkScoreCodes.forEach( (frameworkScoreCode) => {
    //         const element = document.getElementById(frameworkScoreCode)
    //         const data = this.dataService.getFrameworkScoresData(frameworkScoreCode)
    //         const gData = new google.visualization.DataTable()
    //         gData.addColumn('string', 'School ID')
    //         gData.addColumn('number', 'Framework Score') 
    //         // gData.addColumn({type: 'string', role: 'annotation'});
    //         //gData.addColumn({'type': 'string', 'role': 'style'})

    //         const options = {
    //             title: `${frameworkScoreCodeMap[frameworkScoreCode]} Score Distribution`,
    //             legend: { position: 'none' },
    //             // annotations: {
    //             //     style: 'line'
    //             // }
    //         }
    //         data.forEach((row) => {
    //             if(row[0] === selectedSchoolId){
    //                 gData.addRow([row[0], row[1]])
    //             } else {
    //                 gData.addRow([row[0], row[1]])
    //             }
    //         });

    //         const chart = new google.visualization.Histogram(element);
    //         chart.draw(gData, options)
    //     } )
    // }

    // drawFrameworkScore(scoreCode, selectedSchoolId) {
    //     const frameworkScoreCodeMap = {
    //         "CT": "Collaborative Teachers",
    //         "ES": "Effective School Leadership",
    //         "RI": "Rigorous Instruction",
    //         "SE": "Supportive Environment",
    //         "SF": "Strong Family-Community Ties",
    //         "TR": "Trust",
    //         "SA": "Student Achievement",
    //     }

    //     const element = document.getElementById(scoreCode)
    //     const data = this.dataService.getFrameworkScoresData(scoreCode)
    //     const gData = new google.visualization.DataTable()
    //     gData.addColumn('string', 'School ID')
    //     gData.addColumn('number', 'Framework Score') 
    //     // gData.addColumn({type: 'string', role: 'annotation'});
    //     //gData.addColumn({'type': 'string', 'role': 'style'})

    //     const options = {
    //         legend: { position: 'none' },
    //         yAxis: {
    //             maxValue: 175
    //         }
    //         // annotations: {
    //         //     style: 'line'
    //         // }
    //     }

    //     const categoryMap = {
    //         'N': 'Not Meeting',
    //         'A': 'Approaching',
    //         'M': 'Meeting',
    //         'E': 'Exceeding'
    //     }

    //     data.forEach((row) => {
    //         if(row[0] === selectedSchoolId){
    //             gData.addRow([categoryMap[row[0]], row[1]])
    //         } else {
    //             gData.addRow([categoryMap[row[0]], row[1]])
    //         }
    //     });

    //     const chart = new google.visualization.Histogram(element);
    //     chart.draw(gData, options)
    
    // }

    drawFrameworkScore2(scoreCode, selectedSchoolId) {
        const frameworkScoreCodeMap = {
            "CT": "Collaborative Teachers",
            "ES": "Effective School Leadership",
            "RI": "Rigorous Instruction",
            "SE": "Supportive Environment",
            "SF": "Strong Family-Community Ties",
            "TR": "Trust",
            "SA": "Student Achievement",
        }

        const rawData = this.dataService.getRawData()
        const schoolObj = rawData[selectedSchoolId]
        let value = null
        if(schoolObj.frameworkScores){
            value = schoolObj.frameworkScores[scoreCode]
        }

        const element = document.getElementById(scoreCode)
        const data = this.dataService.getRawFrameworkData(scoreCode)
        const gData = new google.visualization.DataTable()
        gData.addColumn('string', 'Category')
        gData.addColumn('number', 'Number of Schools') 
        gData.addColumn({'type': 'string', 'role': 'style'})

        const options = {
            legend: { position: 'none' },
            hAxis: {
                title: 'Number of schools in the city'
            },
            // annotations: {
            //     style: 'line'
            // }
            isStacked: true
        }

        if (scoreCode === 'SA'){
            options.title = 'Student Achievement'
        }

        const categoryMap = {
            'N': 'Not Meeting',
            'A': 'Approaching',
            'M': 'Meeting',
            'E': 'Exceeding'
        }

        const frameworkScoreKey = {
            'N': {
                startScore: 1,
                endScore: 1.99,
            },
            'A': {
                startScore: 2,
                endScore: 2.99,
            },
            'M':  {
                startScore: 3,
                endScore: 3.99,
            },
            'E': {
                startScore: 4,
                endScore: 4.99,
            }
        }


        data.forEach((row) => {
            if(value >= frameworkScoreKey[row[0]].startScore &&  value <= frameworkScoreKey[row[0]].endScore){
                gData.addRow([categoryMap[row[0]], row[1], 'color: #8F2261'])
            } else {
                gData.addRow([categoryMap[row[0]], row[1], 'color: #76787B'])
            }
        });

        const chart = new google.visualization.BarChart(element);
        chart.draw(gData, options)
    
    }

    drawPerformanceImpact(elementId, selectedSchoolId) {
        const element = document.getElementById(elementId)
        const data = this.dataService.getPerformanceImpactData()
        const gData = new google.visualization.DataTable()
        gData.addColumn('number', 'Performance')
        gData.addColumn('number', 'Impact')
        gData.addColumn({'type': 'string', 'role': 'style'})

        let lastRow
        data.forEach((row) => {
            if(row[0] === selectedSchoolId) {
                lastRow = [row[1], row[2], 'point { size: 6; shape-type: circle; fill-color: #8F2261; }']
            } else {
                gData.addRow([row[1], row[2], 'point { size: 2; shape-type: circle; fill-color: #BFBFBF; opacity: 0.5; }'])
            }
        });
        gData.addRow(lastRow)

        const options = {
            lineWidth: 0,
            pointSize: 5,
            title: `Performance / Impact`,
            hAxis: { title: 'Performance', minValue: 0, maxValue: 1 },
            vAxis: { title: 'Impact', minValue: 0, maxValue: 1 },
            legend: { position: 'none' },
        };

        const chart = new google.visualization.ScatterChart(element);
        chart.draw(gData, options)
    }
}