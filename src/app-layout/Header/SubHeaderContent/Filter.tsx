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
  Typography,
} from "@mui/material"
import { CategoryLabel } from "components/categories/CategoriesLegend"
import { RootState } from "data/store"
import { useSelector } from "react-redux"
import _ from "lodash"

// import { DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const selectGlobalFilter = (state: RootState) => state.globalFilter
const multiSelectJoiner = (selected: string[]) => selected.join(", ")

const Search = () => {
  const { availableValues } = useSelector(selectGlobalFilter)
  const { companies, categories, countries } = availableValues

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])

  const weHaveAnyData =
    companies.length && categories.length && countries.length
  if (!weHaveAnyData) {
    return null
  }

  const companyNodes = companies.map((company) => (
    <MenuItem key={company} value={company}>
      <Checkbox checked={selectedCompanies.indexOf(company) > -1} />
      <ListItemText primary={company} />
    </MenuItem>
  ))
  const countryNodes = countries.map((country) => (
    <MenuItem key={country} value={country}>
      {country}
    </MenuItem>
  ))
  const categoryNodes = categories
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
    setSelectedCompanies(typeof value === "string" ? value.split(",") : value)
  }

  const handleCountriesChange = (
    event: SelectChangeEvent<typeof selectedCountries>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedCountries(typeof value === "string" ? value.split(",") : value)
  }

  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof selectedCategories>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedCategories(typeof value === "string" ? value.split(",") : value)
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

export default memo(Search)
