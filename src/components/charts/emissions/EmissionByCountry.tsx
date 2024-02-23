import { FunctionComponent, memo } from "react";
import ReactApexChart, { Props as ChartProps } from "react-apexcharts"

import { COLOR_OPERATION, COLOR_UPSTREAM, COLOR_DOWNSTREAM } from "utils/CategoryColors";
import { formatAmount } from "utils/formatAmounts";
import { ByCountryDataPoint } from "data/store/types/Types";
import countries from "data/countries";
import { capitalize } from "@mui/material";

interface CountryData {
    operation: number,
    upstream: number,
    downstream: number,
    cluster: number,
    company: string
}

interface EmissionByCountryProps {
    emissionData: Array<ByCountryDataPoint>
}

const valueFormatter = (value: number) => `${value} kton`;

const chartOptions = (counties: string[]): ApexCharts.ApexOptions => {
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
            categories: [...counties.map(category => capitalize(category))]
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
        tooltip: {
            y: {
                formatter(val) {
                    return `${formatAmount(val)} kton`;
                }
            }
        },
        legend: {
            show: false,
            fontFamily: `'Public Sans', sans-serif`,
            offsetX: 10,
            offsetY: 10,
            position: "top",
            horizontalAlign: "right",
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                offsetX: 2,
                offsetY: 2
            },
            itemMargin: {
                horizontal: 15,
                vertical: 50
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
        "operation": [],
        "upstream": [],
        "downstream": []
    }
    emissionData.forEach(emissionPoint => {
        countries.add(emissionPoint.country)
        seriesByCategories["operation"].push(emissionPoint.operation)
        seriesByCategories["upstream"].push(emissionPoint.upstream)
        seriesByCategories["downstream"].push(emissionPoint.downstream)
    })

    const series = Object.keys(seriesByCategories)
        .map(category => {
            return {
                name: category,
                data: seriesByCategories[category]
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