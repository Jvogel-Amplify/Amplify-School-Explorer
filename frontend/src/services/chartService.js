import { GoogleCharts } from 'google-charts'
import { toSnakeCase, toCamelCase } from 'lib'

export default class ChartService {
    constructor(dataService) {
        this.dataService = dataService
        this.minPrice = 700
        this.maxPrice = 1700
        this.mapService = null
        this.state = {}
    }

    setMapService(mapService){
        this.mapService = mapService
    }

    getChartElement(neighborhood, chartWrapper) {
        for (let i = 0; i < chartWrapper.children.length; i++) {
            const element = chartWrapper.children[i].children[1]
            if (element.className && element.className.includes(toSnakeCase(neighborhood))) {
                return element
            }
        }
        const column = document.createElement('div')
        column.className = 'column'
        column.style.display = 'flex'
        column.style['flex-direction'] = 'column'

        const chartElement = document.createElement('div')
        chartElement.className = `chart ${toSnakeCase(neighborhood)}`

        const focusButton = document.createElement('button')
        focusButton.innerHTML = 'Focus'
        focusButton.onclick = () => {window.dispatchEvent(new CustomEvent('focus-neighborhood', {detail: neighborhood}))}

        const toggleChartButton = document.createElement('button')
        toggleChartButton.innerHTML = 'Toggle'
        toggleChartButton.onclick = () => {window.dispatchEvent(new CustomEvent('toggle', {detail: neighborhood}))}


        const chartNav = document.createElement('div')
        chartNav.className = 'chart-nav'

        const title = document.createElement('span')
        title.className = 'title'
        title.innerHTML = neighborhood

        chartNav.appendChild(title)
        chartNav.appendChild(focusButton)
        chartNav.appendChild(toggleChartButton)
        column.appendChild(chartNav)
        column.appendChild(chartElement)
        chartWrapper.appendChild(column)
        return chartElement
    }

    drawHistogram(neighborhood, chartWrapper) {
        const data = this.dataService.getRawDataWithWhereClause('Neighborhood', neighborhood)
        const filteredData = data.map((filteredDataPoint) => {
            return [filteredDataPoint[0], parseFloat(filteredDataPoint[1])]
        })
        if (filteredData.length > 10) {
            const chartElement = this.getChartElement(neighborhood, chartWrapper)
            const gData = new google.visualization.DataTable();
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
                const selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    const value = gData.getValue(selectedItem.row, 0);
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

    drawScatterPlot(neighborhood, chartWrapper) {

        const data = this.dataService.getRawDataWithWhereClause('Neighborhood', neighborhood)
        const filteredData = data.map((filteredDataPoint) => {
                const isActive = filteredDataPoint[3] === 'true' ? 'point { opacity: 1; }' : 'point { opacity: 0.3; }'
                return [parseFloat(filteredDataPoint[1]), parseFloat(filteredDataPoint[10]), isActive]
            })

        const chartElement = this.getChartElement(neighborhood, chartWrapper)

        const gData = new google.visualization.DataTable();
        gData.addColumn('number', 'rent');
        gData.addColumn('number', 'distToTrain');
        gData.addColumn({ 'type': 'string', 'role': 'style' });

        filteredData.forEach((row) => {
            gData.addRow([
                row[0],
                row[1],
                row[2]
            ]);
        });

        const options = {
            lineWidth: 0,
            pointSize: 5,
            title: `Price vs Distance to Closest Train for ${neighborhood}`,
            hAxis: { title: 'Rent', minValue: this.minPrice, maxValue: this.maxPrice },
            vAxis: { title: 'Distance to Closest Train (mi)', minValue: 0, maxValue: .5 },
            legend: { position: 'none' },
        };

        const chart = new google.visualization.LineChart(chartElement);

        const selectHandler = () => {
            const selectedItem = chart.getSelection()[0];
            if (selectedItem) {
                // const value = gData.getValue(selectedItem.row, 0);
                // const dataPoint = this.dataService.getRow(value)
                //this.drawHistogram(neighborhood, chartWrapper)
            }
        }

        google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(gData, options)
    }

    toggleChart(neighborhood, chartWrapper) {
        const currentChart = this.state[toCamelCase(neighborhood)].chart
        if (currentChart === 'priceDistribution') {
            this.drawScatterPlot(neighborhood, chartWrapper)
            this.state[toCamelCase(neighborhood)].chart = 'scatterPlot'
        } else if (currentChart === 'scatterPlot') {
            this.drawHistogram(neighborhood, chartWrapper)
            this.state[toCamelCase(neighborhood)].chart = 'priceDistribution'
        }
    }

    displayCharts(chartWrapper) {
        GoogleCharts.load(
            () => {
                const neighborhoods = this.dataService.getCategoriesForColumn('Neighborhood')
                neighborhoods.forEach((neighborhood) => {
                    this.drawHistogram(neighborhood, chartWrapper)
                    this.state[toCamelCase(neighborhood)] = {
                        chart: 'priceDistribution'
                    }
                })
            }
        )

    }
}