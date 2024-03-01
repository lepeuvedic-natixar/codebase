import { useMemo, useState } from "react"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import MainCard from "components/MainCard"
import { Box, Button, Typography } from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import {
  Border,
  DateInputsWrapper,
  DateSlider,
  MainContainer,
  PickersWrapper,
  ScrollComponent,
  SliderWrapper,
  StyledDatePicker,
  Years,
} from "./styled"

const getDefaultMonth = (datePickerNumber: 1 | 2 | 3 | 4, period: number) => {
  const currentYear = new Date().getFullYear()
  const previousYear = currentYear - 1
  const previousYear2 = previousYear - 1
  const monthIndex = Math.abs(period % 12)
  const currentMonth = monthIndex + datePickerNumber
  const yearsLeftFromPreviousYear2 = Math.floor(
    (period + datePickerNumber - 1) / 12,
  )
  if (currentMonth === 12) {
    return `${previousYear2 + yearsLeftFromPreviousYear2}-${currentMonth}-01`
  }
  if (currentMonth > 12) {
    return `${previousYear2 + yearsLeftFromPreviousYear2}-${Math.abs(currentMonth % 12)}-01`
  }
  return `${previousYear2 + yearsLeftFromPreviousYear2}-${Math.abs(currentMonth % 12)}-01`
}

export default function DateFilter() {
  const [value, setValue] = useState<Date | null>(new Date())
  const [dates, setDates] = useState<Date | null>(new Date())
  const [period, setPeriod] = useState<number>(23)
  const currentYear = new Date().getFullYear()
  const previousYear = currentYear - 1
  const previousYear2 = previousYear - 1

  const handlePeriodChange = (_: Event, newPeriod: number | number[]) => {
    setPeriod(newPeriod as number)
  }

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  const defaultDate1 = useMemo(() => {
    const defDateMonth = getDefaultMonth(1, period)
    return new Date(defDateMonth)
  }, [period])

  const defaultDate2 = useMemo(() => {
    const defDateMonth = getDefaultMonth(2, period)
    return new Date(defDateMonth)
  }, [period])

  const defaultDate3 = useMemo(() => {
    const defDateMonth = getDefaultMonth(3, period)
    return new Date(defDateMonth)
  }, [period])

  const defaultDate4 = useMemo(() => {
    const defDateMonth = getDefaultMonth(4, period)
    return new Date(defDateMonth)
  }, [period])

  return (
    <MainCard codeHighlight>
      <MainContainer>
        <SliderWrapper>
          <Years>
            <Typography>{previousYear2}</Typography>
            <Typography>{previousYear}</Typography>
            <Typography>{currentYear}</Typography>
          </Years>
          <DateSlider
            value={period}
            onChange={handlePeriodChange}
            min={0}
            max={23}
          />
        </SliderWrapper>
        <ScrollComponent>
          <PickersWrapper>
            <Border />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StyledDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                views={["day"]}
                defaultValue={defaultDate1}
                value={defaultDate1}
              />
              <StyledDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                views={["day"]}
                defaultValue={defaultDate2}
                value={defaultDate2}
              />
              <StyledDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                views={["day"]}
                defaultValue={defaultDate3}
                value={defaultDate3}
              />
              <StyledDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                views={["day"]}
                defaultValue={defaultDate4}
                value={defaultDate4}
              />
            </LocalizationProvider>
          </PickersWrapper>
        </ScrollComponent>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateInputsWrapper>
              <DesktopDatePicker
                format="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
              />
              <Typography>To</Typography>
              <DesktopDatePicker
                format="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
              />
              <Button variant="contained">Accept</Button>
            </DateInputsWrapper>
          </LocalizationProvider>
        </Box>
      </MainContainer>
    </MainCard>
  )
}
