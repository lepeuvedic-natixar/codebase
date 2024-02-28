import { useState } from "react"
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
  StyledDatePicker,
} from "./styled"

export default function DateFilter() {
  const [value, setValue] = useState<Date | null>(new Date())

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  return (
    <MainCard codeHighlight>
      <MainContainer>
        <DateSlider defaultValue={35} />
        <ScrollComponent>
          <PickersWrapper>
            <Border />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StyledDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={(newValue: any) => {
                  setValue(newValue)
                }}
              />
              <StyledDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={(newValue: any) => {
                  setValue(newValue)
                }}
              />
              <StyledDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={(newValue: any) => {
                  setValue(newValue)
                }}
              />
              <StyledDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={(newValue: any) => {
                  setValue(newValue)
                }}
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
