import { useState } from "react"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import MainCard from "components/MainCard"
import {
  Border,
  PickersWrapper,
  ScrollComponent,
  StyledDatePicker,
} from "./styled"

export default function DateFilter() {
  const [value, setValue] = useState<Date | null>(new Date())

  return (
    <MainCard codeHighlight>
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
    </MainCard>
  )
}
