import React from 'react';

import { Polar } from 'react-chartjs-2';

export default ({ colors, data, hostName, barLabels }) => (
    <Polar data={{
        labels: barLabels||[],
        datasets: Object.keys(data).map(dataKey => {
            const rgb = colors[dataKey];
            return ({
                label: hostName[dataKey][0],
                fill: true,
                backgroundColor: `rgb(${rgb},0.2)`,
                borderColor: `rgb(${rgb},1)`,
                borderWidth: 1,
                hoverBackgroundColor: `rgb(${rgb},0.4)`,
                hoverBorderColor: `rgb(${rgb},1)`,
                data: data[dataKey],
            })
        })
    }} />
)
