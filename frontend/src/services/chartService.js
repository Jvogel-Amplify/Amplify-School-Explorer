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

    // drawHistogram(neighborhood, chartWrapper) {
    //     const data = this.dataService.getRawDataWithWhereClause('Neighborhood', neighborhood)
    //     const filteredData = data.map((filteredDataPoint) => {
    //         return [filteredDataPoint[0], parseFloat(filteredDataPoint[1])]
    //     })
    //     if (filteredData.length > 10) {
    //         const chartElement = this.getChartElement(neighborhood, chartWrapper)
    //         const gData = new google.visualization.DataTable()
    //         gData.addColumn('string', 'ID');
    //         gData.addColumn('number');

    //         filteredData.forEach((row) => {
    //             gData.addRow([
    //                 row[0],
    //                 row[1]
    //             ]);
    //         });

    //         // Set chart options
    //         const options = {
    //             legend: { position: 'none' },
    //             histogram: { bucketSize: 50, hideBucketItems: true },
    //         }

    //         // Instantiate and draw the chart.
    //         const chart = new google.visualization.Histogram(chartElement)

    //         const selectHandler = () => {
    //             const selectedItem = chart.getSelection()[0]
    //             if (selectedItem) {
    //                 const value = gData.getValue(selectedItem.row, 0)
    //                 const dataPoint = this.dataService.getRow(value)
    //                 if(this.mapService){
    //                     //this.mapService.highlightDataPoint(dataPoint)
    //                 }
    //             }
    //         }

    //         // Listen for the 'select' event, and call my function selectHandler() when
    //         // the user selects something on the chart.
    //         google.visualization.events.addListener(chart, 'select', selectHandler)

    //         chart.draw(gData, options)
    //     }

    // }

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
            hAxis: {format:'#%'},
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
            title: 'Student Enrollment'
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

    drawAllFrameworkScores(elementWrapperId, selectedSchoolId) {
        const elementWrapper = document.getElementById(elementWrapperId)

        const frameworkScoreCodes = ["CT", "ES", "RI", "SE", "SF", "TR", "SA"]

        const frameworkScoreCodeMap = {
            "CT": "Collaborative Teachers",
            "ES": "Effective School Leadership",
            "RI": "Rigorous Instruction",
            "SE": "Supportive Environment",
            "SF": "Strong Family-Community Ties",
            "TR": "Trust",
            "SA": "Student Achievement",
        }


        frameworkScoreCodes.forEach( (frameworkScoreCode) => {
            const element = document.createElement('div')
            element.className = `chart ${frameworkScoreCode}`
            elementWrapper.appendChild(element)
            const data = this.dataService.getFrameworkScoresData(frameworkScoreCode)
            const gData = new google.visualization.DataTable()
            gData.addColumn('string', 'School ID')
            gData.addColumn('number', 'Framework Score') 
            //gData.addColumn({'type': 'string', 'role': 'style'})

            const options = {
                title: `Framework: ${frameworkScoreCodeMap[frameworkScoreCode]} Score`
            }
            data.forEach((row) => {
                gData.addRow(row)
            });

            const chart = new google.visualization.Histogram(element);
            chart.draw(gData, options)
        } )
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
                lastRow = [row[1], row[2], 'point { size: 6; shape-type: circle; fill-color: #FF8C00; }']
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