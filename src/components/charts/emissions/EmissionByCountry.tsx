import { FunctionComponent, memo } from "react";
import ReactApexChart from "react-apexcharts"

import { getColorByCategory } from "utils/CategoryColors";
import { formatAmount } from "utils/formatAmounts";
import { ByCountryDataPoint } from "data/store/types/Types";
import { capitalize } from "@mui/material";


interface EmissionByCountryProps {
    emissionData: Array<ByCountryDataPoint>
}

const chartOptions = (countries: string[]): ApexCharts.ApexOptions => {
    return {
        chart: {
            type: 'bar',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            parentHeightOffset: 0,
        },
        plotOptions: {
            bar: {
                columnWidth: '30%',
                barHeight: '70%',
                borderRadius: 4,
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 8,
            colors: ['transparent']
        },
        xaxis: {
            categories: [...countries.map(country => capitalize(country))]
        },
        yaxis: {
            title: {
                text: '(kton)'
            },
            labels: {
                formatter(val) {
                    return formatAmount(val)
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            show: false
        },
        tooltip: {
            followCursor: true,
            y: {
                formatter(val) {
                    return `${formatAmount(val)} kton`;
                }
            }
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    yaxis: {
                        show: false
                    }
                }
            }
        ]
    }
}

const EmissionByCountry: FunctionComponent<EmissionByCountryProps> = ({ emissionData }) => {
    const countries = new Set<string>()
    const seriesByCategories: { [id: string]: (number | null)[] } = {
        "Operation": [],
        "Upstream": [],
        "Downstream": []
    }
    emissionData.forEach(emissionPoint => {
        countries.add(emissionPoint.country)
        seriesByCategories["Operation"].push(emissionPoint.operation)
        seriesByCategories["Upstream"].push(emissionPoint.upstream)
        seriesByCategories["Downstream"].push(emissionPoint.downstream)
    })

    const series = Object.keys(seriesByCategories)
        .map(category => {
            return {
                name: category,
                data: seriesByCategories[category],
                color: getColorByCategory(category)
            }
        })

    return (emissionData.length <= 0 ? null : <ReactApexChart
        type="bar"
        options={chartOptions(Array.from(countries))}
        series={series}
        height="100%"
    />
    )
}

export default memo(EmissionByCountry)