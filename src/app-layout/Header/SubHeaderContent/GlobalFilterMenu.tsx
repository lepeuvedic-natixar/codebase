// material-ui
import { memo, useState } from "react"
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SxProps,
  Typography,
} from "@mui/material"
import { CategoryLabel } from "components/categories/CategoriesLegend"
import { RootState } from "data/store"
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import {
  setSelectedCategories as selectedCategoriesAction,
  setSelectedCompanies as selectedCompaniesAction,
  setSelectedCountries as selectedCountriesAction,
} from "data/store/features/coordinates/CoordinateSlice"

// import { DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const selectGlobalFilter = (state: RootState) => state.globalFilter
const multiSelectJoiner = (selected: string[]) => selected.join(", ")
const parseSelectedValues = (receivedValues: string | string[]): string[] =>
  receivedValues === "string"
    ? receivedValues.split(",").sort()
    : (receivedValues as string[])

const GlobalFilterMenu = (props: SxProps) => {
  const { ...sxProps } = props
  const dispatch = useDispatch()
  const globalFilter = useSelector(selectGlobalFilter)
  const {
    companies: availableCompanies,
    categories: availableCategories,
    countries: availableCountries,
  } = globalFilter.availableValues

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const weHaveAnyData =
    availableCompanies.length &&
    availableCountries.length &&
    availableCategories.length
  if (!weHaveAnyData) {
    return null
  }

  const companyNodes = availableCompanies.map((company) => (
    <MenuItem key={company} value={company}>
      <Checkbox checked={selectedCompanies.indexOf(company) > -1} />
      <ListItemText primary={company} />
    </MenuItem>
  ))
  const countryNodes = availableCountries.map((country) => (
    <MenuItem key={country} value={country}>
      {country}
    </MenuItem>
  ))
  const categoryNodes = availableCategories
    .map((category) => _.capitalize(category))
    .map((category) => (
      <MenuItem key={category} value={category}>
        <CategoryLabel category={category} />
      </MenuItem>
    ))

  const handleCompaniesChange = (
    event: SelectChangeEvent<typeof selectedCompanies>,
  ) => {
    const {
      target: { value },
    } = event
    const parsedValues = parseSelectedValues(value)
    dispatch(selectedCompaniesAction(parsedValues))
    setSelectedCompanies(parsedValues)
  }

  const handleCountriesChange = (
    event: SelectChangeEvent<typeof selectedCountries>,
  ) => {
    const {
      target: { value },
    } = event
    const parsedValues = parseSelectedValues(value)
    dispatch(selectedCountriesAction(parsedValues))
    setSelectedCountries(parsedValues)
  }

  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof selectedCategories>,
  ) => {
    const {
      target: { value },
    } = event
    const parsedValues = parseSelectedValues(value)
    dispatch(selectedCategoriesAction(parsedValues))
    setSelectedCategories(parsedValues)
  }

  return (
    <Stack
      direction="row"
      gap={2.5}
      alignItems="center"
      sx={{
        width: "100%",
        ml: { xs: 0, md: 1, lg: -1 },
        p: 1,
        ...sxProps,
      }}
    >
      <Typography>Filter</Typography>
      <FormControl sx={{ width: 220 }}>
        <InputLabel>Business Entity / Facility</InputLabel>
        <Select
          value={selectedCompanies}
          renderValue={multiSelectJoiner}
          onChange={handleCompaniesChange}
          multiple
        >
          {companyNodes}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 160 }}>
        <InputLabel>Geographic Area</InputLabel>
        <Select
          value={selectedCountries}
          renderValue={multiSelectJoiner}
          onChange={handleCountriesChange}
          multiple
          sx={{
            "& .MuiList-root": {
              padding: "12px",
            },
          }}
        >
          {countryNodes}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 100 }}>
        <InputLabel>Scope</InputLabel>
        <Select
          value={selectedCategories}
          renderValue={multiSelectJoiner}
          onChange={handleCategoriesChange}
          multiple
        >
          {categoryNodes}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default memo(GlobalFilterMenu)
