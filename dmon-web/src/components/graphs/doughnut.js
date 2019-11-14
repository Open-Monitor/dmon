import React from 'react';

import { Doughnut } from 'react-chartjs-2';

export default ({ colors, data, data2, data3, hostName, barLabels }) => (
    <Doughnut data={{
        labels: ["Memory Used", "Memory Avaliable", "Memory Total"],
        datasets: [{
                label: ["Memory Used", "Memory Avaliable", "Memory Total"],
                fill: true,
                backgroundColor: ["#ccc", "#36a2eb", "#ffce56"],
                data: [Object.values(data).map(i => i.pop()).pop()||"",
                       Object.values(data2).map(i => i.pop()).pop()||"",
                       Object.values(data3).map(i => i.pop()).pop()||"",
                ]
        }]
    }} />
)
