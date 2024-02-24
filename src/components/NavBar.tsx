import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Slider } from "@mui/material"
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "data/store";
import { changeVisibileDates } from "data/store/features/coordinates/CoordinateSlice";

import { debounce } from 'lodash'

import './navbar.css'


const RANGES_TO_USE = 12

const selectMinTime = (state: RootState) => state.coordinates.wholeDataSet.min_time
const selectMaxTime = (state: RootState) => state.coordinates.wholeDataSet.max_time

const NavigationBar: FunctionComponent = () => {
    const [range, setRange] = useState([0, RANGES_TO_USE - 1])
    const minSliderValue = useSelector(selectMinTime);
    const maxSliderValue = useSelector(selectMaxTime);
    const dispatch = useAppDispatch()

    const delta = (maxSliderValue - minSliderValue) / RANGES_TO_USE

    const valueText = useMemo(() => (value: number): string => {
        const timeLabel = new Date(minSliderValue + (delta * value))
        return `${timeLabel.toLocaleTimeString()}`;
    }, [minSliderValue, delta])

    const updateTimeFilter = useCallback(debounce(
        (newTimeRange: number[]) => {
            dispatch(changeVisibileDates({
                from: minSliderValue + (delta * newTimeRange[0]),
                to: minSliderValue + (delta * newTimeRange[1])
            }))
        }
        , 700), [dispatch, minSliderValue, delta])

    const handleTimeRangeChange = (event: Event, newValue: number[]) => {
        event.preventDefault()
        setRange(newValue)
        updateTimeFilter(newValue);
    }

    return (
        <header>
            <div className="container">
                <nav className="top-bar">
                    <Box className="dimensions-bar">
                        <Slider
                            variant="solid"
                            getAriaLabel={() => 'Time range'}
                            onChange={handleTimeRangeChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valueText}
                            valueLabelFormat={valueText}
                            min={0}
                            max={RANGES_TO_USE - 1}
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