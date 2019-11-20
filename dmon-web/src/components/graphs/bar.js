import React from 'react';

import { Bar } from 'react-chartjs-2';

export default ({ colors, data, hostName, barLabels}) => (
    <Bar data={{
        labels: barLabels||[""],
        datasets: Object.keys(data).map((dataKey) => {
            const rgb = colors[dataKey];
            return ({
                label: hostName[dataKey][0],
                fill: false,
                backgroundColor: `rgb(${rgb},0.2)`,
                borderColor: `rgb(${rgb},1)`,
                borderWidth: 1,
                hoverBackgroundColor: `rgb(${rgb},0.4)`,
                hoverBorderColor: `rg(b${rgb},1)`,
                data: data[dataKey],
            })
        })
    }} options={{
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                    color: 'rgba(45,50,73,1)',
                    lineWidth: 2,
                    drawTicks: false,
                    drawBorder: false,
                },
            }],
        }
    }} />
)
