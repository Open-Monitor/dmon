import React from 'react';

import { Line } from 'react-chartjs-2';

export default ({ colors, data, hostName, fill }) => (
    <Line data={{
        labels: [
          new Date(Date.now() - 1000* (60*10)).toLocaleTimeString(),
          new Date(Date.now() - 1000* (60*7.5)).toLocaleTimeString(),
          new Date(Date.now() - 1000* (60*5)).toLocaleTimeString(),
          new Date(Date.now() - 1000* (60*2.5)).toLocaleTimeString(),
          new Date().toLocaleTimeString()
        ],
        datasets: Object.keys(data).map(dataKey => {
            const rgb = colors[dataKey];
            return ({
                label: hostName[dataKey][0],
                fill: fill,
                backgroundColor: `rgb(${rgb},0.2)`,
                borderColor: `rgb(${rgb},1)`,
                borderWidth: 2,
                hoverBackgroundColor: `rgb(${rgb},0.4)`,
                hoverBorderColor: `rgb(${rgb},1)`,
                data: data[dataKey],
            })
        })
    }} options={{
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
