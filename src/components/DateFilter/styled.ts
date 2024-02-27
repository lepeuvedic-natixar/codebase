import { styled } from "@mui/material/styles"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import { Box } from "@mui/material"

export const StyledDatePicker = styled(StaticDatePicker)(() => ({
  width: "fit-content",
  minWidth: "fit-content",
  overflowX: "hidden",
  "& .MuiPickersLayout-contentWrapper": {
    width: "fit-content",
    height: "fit-content",
  },
  "& .MuiDateCalendar-root": {
    width: "fit-content",
    height: "fit-content",
  },
  "& .MuiPickersCalendarHeader-root": {
    padding: 0,
    margin: 0,
    width: "100%",
    borderBottom: "1px solid transparent",
    justifyContent: "center",
    "& .MuiPickersArrowSwitcher-root": {
      display: "none",
    },
    "& .MuiPickersCalendarHeader-labelContainer": {
      margin: 0,
    },
    "& .MuiPickersCalendarHeader-switchViewButton": {
      display: "none",
    },
  },
  "& .MuiPickersSlideTransition-root": {
    minHeight: 200,
  },
}))

export const Border = styled(Box)(() => ({
  width: "100%",
  height: 29,
  borderBottom: "1px solid #e6ebf1",
  position: "absolute",
  top: 0,
  left: 0,
}))

export const ScrollComponent = styled(Box)(() => ({
  display: "flex",
  width: "calc(100% - 0px)",
  overflowX: "scroll",
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
}))

export const PickersWrapper = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  gap: "16px",
  position: "relative",
}))
