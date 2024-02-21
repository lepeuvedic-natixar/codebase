import { FunctionComponent, useMemo, useState } from "react";
import { Box, Button, Slider } from "@mui/material"

import './navbar.css'
import { useLazyGetRandomCoordinatesQuery } from "data/store/features/coordinates/CoordinateClient";

import { debounce } from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { changeVisibileDates } from "data/store/features/coordinates/CoordinateSlice";
import { RootState } from "data/store/index";

const RANGES_TO_USE = 12

const NavigationBar: FunctionComponent = () => {
    const [range, setRange] = useState([0, RANGES_TO_USE - 1])
    const minSliderValue = useSelector((state: RootState) => state.coordinates.wholeDataSet.min_time);
    const maxSliderValue = useSelector((state: RootState) => state.coordinates.wholeDataSet.max_time);
    const [pullAllData] = useLazyGetRandomCoordinatesQuery()
    const dispatch = useDispatch()

    const delta = (maxSliderValue - minSliderValue) / RANGES_TO_USE

    const valueText = useMemo(() => (value: number): string => {
        const timeLabel = new Date(minSliderValue + (delta * value))
        return `${timeLabel.toLocaleTimeString()}`;
    }, [minSliderValue, delta])

    const onRefreshClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        pullAllData()
    }

    const updateTimeFilter = useMemo(() => debounce(
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
                    <Button onClick={onRefreshClick}>Pull All</Button>

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