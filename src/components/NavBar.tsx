import { useCallback, useState } from "react"
import { Box, Slider } from "@mui/material"

import { useAppDispatch } from "data/store"

import { debounce } from "lodash"

import "./navbar.css"

const NavigationBar = () => {
  const min_time = 0
  const max_time = Number.MAX_SAFE_INTEGER
  const totalSteps = 12

  const [range, setRange] = useState([0, rangesToUse - 1])
  const dispatch = useAppDispatch()
  const delta = (maxSliderValue - minSliderValue) / rangesToUse
  const valueText = useCallback(
    (value: number): string => {
      const timeLabel = new Date(minSliderValue + delta * value)
      return `${timeLabel.toLocaleTimeString()}`
    },
    [minSliderValue, delta],
  )

  const updateTimeFilter = useCallback(
    debounce((newTimeRange: number[]) => {
      dispatch(
        changeVisibileDates({
          from: minSliderValue + delta * newTimeRange[0],
          to: minSliderValue + delta * newTimeRange[1],
        }),
      )
    }, 700),
    [dispatch, minSliderValue, delta],
  )

  const handleTimeRangeChange = (event: Event, newValue: number[]) => {
    event.preventDefault()
    setRange(newValue)
    updateTimeFilter(newValue)
  }

  return (
    <header>
      <div className="container">
        <nav className="top-bar">
          <Box className="dimensions-bar">
            <Slider
              variant="solid"
              getAriaLabel={() => "Time range"}
              // @ts-ignore
              onChange={handleTimeRangeChange}
              valueLabelDisplay="auto"
              getAriaValueText={valueText}
              valueLabelFormat={valueText}
              min={0}
              max={rangesToUse - 1}
              value={range}
              step={1}
              marks
            />
          </Box>
        </nav>
      </div>
    </header>
  )
}

export default NavigationBar
