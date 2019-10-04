import { GoogleCharts } from 'google-charts'
import { toSnakeCase, toCamelCase } from 'lib'

export default class ChartService {
    constructor(dataService) {
        this.dataService = dataService
        this.mapService = null
        this.state = {}
    }

    setMapService(mapService){
        this.mapService = mapService
    }

    // getChartElement(neighborhood, chartWrapper) {
    //     for (let i = 0; i < chartWrapper.children.length; i++) {
    //         const element = chartWrapper.children[i].children[1]
    //         if (element.className && element.className.includes(toSnakeCase(neighborhood))) {
    //             return element
    //         }
    //     }
    //     const column = document.createElement('div')
    //     column.className = 'column'
    //     column.style.display = 'flex'
    //     column.style['flex-direction'] = 'column'

    //     const chartElement = document.createElement('div')
    //     chartElement.className = `chart ${toSnakeCase(neighborhood)}`

    //     const focusButton = document.createElement('button')
    //     focusButton.innerHTML = 'Focus'
    //     focusButton.onclick = () => {window.dispatchEvent(new CustomEvent('focus-neighborhood', {detail: neighborhood}))}

    //     const toggleChartButton = document.createElement('button')
    //     toggleChartButton.innerHTML = 'Toggle'
    //     toggleChartButton.onclick = () => {window.dispatchEvent(new CustomEvent('toggle', {detail: neighborhood}))}


    //     const chartNav = document.createElement('div')
    //     chartNav.className = 'chart-nav'

    //     const title = document.createElement('span')
    //     title.className = 'title'
    //     title.innerHTML = neighborhood

    //     chartNav.appendChild(title)
    //     chartNav.appendChild(focusButton)
    //     chartNav.appendChild(toggleChartButton)
    //     column.appendChild(chartNav)
    //     column.appendChild(chartElement)
    //     chartWrapper.appendChild(column)
    //     return chartElement
    // }

    drawHistogram(neighborhood, chartWrapper) {
        const data = this.dataService.getRawDataWithWhereClause('Neighborhood', neighborhood)
        const filteredData = data.map((filteredDataPoint) => {
            return [filteredDataPoint[0], parseFloat(filteredDataPoint[1])]
        })
        if (filteredData.length > 10) {
            const chartElement = this.getChartElement(neighborhood, chartWrapper)
            const gData = new google.visualization.DataTable()
            gData.addColumn('string', 'ID');
            gData.addColumn('number');

            filteredData.forEach((row) => {
                gData.addRow([
                    row[0],
                    row[1]
                ]);
            });

            // Set chart options
            const options = {
                legend: { position: 'none' },
                histogram: { bucketSize: 50, hideBucketItems: true },
            }

            // Instantiate and draw the chart.
            const chart = new google.visualization.Histogram(chartElement)

            const selectHandler = () => {
                const selectedItem = chart.getSelection()[0]
                if (selectedItem) {
                    const value = gData.getValue(selectedItem.row, 0)
                    const dataPoint = this.dataService.getRow(value)
                    if(this.mapService){
                        //this.mapService.highlightDataPoint(dataPoint)
                    }
                }
            }

            // Listen for the 'select' event, and call my function selectHandler() when
            // the user selects something on the chart.
            google.visualization.events.addListener(chart, 'select', selectHandler)

            chart.draw(gData, options)
        }

    }

    drawScatterPlot(elementId, selectedSchoolId) {
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
                gData.addRow([row[1], row[2], 'point { size: 2; shape-type: circle; fill-color: #0000ff; }'])

            }
        });
        gData.addRow(lastRow)

        const options = {
            lineWidth: 0,
            pointSize: 5,
            title: ``,
            hAxis: { title: 'Performance', minValue: 0, maxValue: 1 },
            vAxis: { title: 'Impact', minValue: 0, maxValue: 1 },
            legend: { position: 'none' },
        };

        const chart = new google.visualization.LineChart(element);

        // const selectHandler = () => {
        //     const selectedItem = chart.getSelection()[0];
        //     if (selectedItem) {
        //         // const value = gData.getValue(selectedItem.row, 0);
        //         // const dataPoint = this.dataService.getRow(value)
        //         //this.drawHistogram(neighborhood, chartWrapper)
        //     }
        // }

        // google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(gData, options)
    }

    // toggleChart(neighborhood, chartWrapper) {
    //     const currentChart = this.state[toCamelCase(neighborhood)].chart
    //     if (currentChart === 'priceDistribution') {
    //         this.drawScatterPlot(neighborhood, chartWrapper)
    //         this.state[toCamelCase(neighborhood)].chart = 'scatterPlot'
    //     } else if (currentChart === 'scatterPlot') {
    //         this.drawHistogram(neighborhood, chartWrapper)
    //         this.state[toCamelCase(neighborhood)].chart = 'priceDistribution'
    //     }
    // }

    init(callback) {
        GoogleCharts.load(
            () => {
                this.init = true
                callback()
            }
        )

    }
}