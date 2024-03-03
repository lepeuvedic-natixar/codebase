// material-ui
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import { RootState } from "data/store"
import { useSelector } from "react-redux"
import { CategoryLabel } from "components/categories/CategoriesLegend"
import _ from "lodash"
import { useState } from "react"

// import { DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const selectGlobalFilter = (state: RootState) => state.globalFilter

const Search = () => {
  const { availableValues } = useSelector(selectGlobalFilter)
  const { companies, categories, countries } = availableValues

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
  const categoryNodes = categories.map((category) => (
    <MenuItem key={category} value={category}>
      <CategoryLabel category={_.capitalize(category)} />
    </MenuItem>
  ))

  /*
  const handleCompaniesChange = (
    event: SelectChangeEvent<typeof selectedCompanies>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedCompanies(typeof value === "string" ? value.split(",") : value)
  }
  */

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        ml: { xs: 0, md: 1, lg: -1 },
        p: 1,
      }}
    >
      <Stack direction="row" gap={2.5} alignItems="center">
        <Typography>Filter</Typography>
        <FormControl sx={{ width: 220 }}>
          <InputLabel>Business Entity / Facility</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCompanies}
            // onChange={handleCompaniesChange}
            multiple
          >
            {companyNodes}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 160 }}>
          <InputLabel>Geographic Area</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            multiple
            value={selectedCountries}
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
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            multiple
            value={selectedCategories}
          >
            {categoryNodes}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  )
}

export default Search
