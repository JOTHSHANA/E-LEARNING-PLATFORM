import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function SolvedProgress() {
    const [chartData] = useState({
        series: [{
            data: [76, 67, 61, 90,67, 70]
        }],
        options: {
            chart: {
                height: 390,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: true, // Set to false for vertical bars
                    dataLabels: {
                        position: 'top', // Options: 'top', 'center', 'bottom'
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: (val) => `${val}%`,
                offsetY: 0,
                offsetX: 20,
                style: {
                    fontSize: '12px',
                    colors: ["var(--text)"]
                }
            },
            xaxis: {
                categories: ['C', 'C++', 'Java', 'Python','JavaScript', 'SQL'],
                labels: {
                    style: {
                        colors: 'var(--text)',
                        fontWeight: 'bold',
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: 'var(--text)', // Add this line
                        fontWeight: 'bold',
                    }
                }
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#39539E'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        height: 300,
                    },
                    legend: {
                        show: false
                    }
                }
            }]
        }
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={290} />
            </div>
        </div>
    )
}

export default SolvedProgress;
