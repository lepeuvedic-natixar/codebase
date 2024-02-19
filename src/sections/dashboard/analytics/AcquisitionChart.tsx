import { useEffect, useState } from "react"

// material-ui
import { useTheme } from "@mui/material/styles"

// project imports
import useConfig from "hooks/useConfig"

// third-party
import ReactApexChart, { Props as ChartProps } from "react-apexcharts"

// types
import { ThemeMode } from "types/config"

// ==============================|| ACQUISITION-CHANNELS CHART ||============================== //

interface Props {
  slot: string
}

const AcquisitionChart = ({ slot }: Props) => {
  const theme = useTheme()
  const line = theme.palette.divider
  const { primary, secondary } = theme.palette.text

  const { mode } = useConfig()

  // chart options
  const barChartOptions = {
    chart: {
      type: "bar",
      height: 250,
      width: "100%",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories:
        slot === "month"
          ? [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]
          : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        show: true,
        style: {
          colors: [
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
          ],
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: [
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
          ],
        },
      },
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        show: true,
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 10,
      markers: {
        width: 8,
        height: 8,
        radius: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      strokeDashArray: 5,
      position: "back",
    },
    stroke: {
      colors: ["transparent"],
      width: 1,
    },
  }

  const [options, setOptions] = useState<ChartProps>(barChartOptions)
  const [series, setSeries] = useState([
    {
      name: "Scope 1",
      data: [21, 17, 15, 13, 15, 13, 16, 13, 8, 14, 11, 9, 7, 5, 3, 3, 7],
    },
    {
      name: "Scope 2",
      data: [28, 30, 20, 26, 18, 27, 22, 28, 20, 21, 15, 14, 12, 10, 8, 18, 16],
    },
    {
      name: "Scope 3",
      data: [
        50, 51, 60, 54, 53, 48, 55, 40, 44, 42, 44, 44, 42, 40, 42, 32, 16,
      ],
    },
  ])

  useEffect(() => {
    setSeries([
      {
        name: "Scope 1",
        data:
          slot === "month"
            ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35]
            : [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Scope 2",
        data:
          slot === "month"
            ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41]
            : [11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "Scope 3",
        data:
          slot === "month"
            ? [23, 20, 201, 24, 57, 21, 45, 22, 75, 45, 49, 42]
            : [8, 40, 38, 46, 32, 49, 56],
      },
    ])
  }, [slot])

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      colors: ["#EF8100", "#00BA34", "#0084FF"],
      legend: {
        labels: {
          colors: "grey.500",
        },
      },
      theme: {
        mode: mode === ThemeMode.DARK ? "dark" : "light",
      },
    }))
  }, [mode, primary, secondary, line, theme])

  return (
    <ReactApexChart options={options} series={series} type="bar" height={250} />
  )
}

export default AcquisitionChart
