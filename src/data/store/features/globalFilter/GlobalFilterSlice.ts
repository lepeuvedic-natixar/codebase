import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit"
import _ from "lodash"
import {
  DateTimeRangeFilter,
  GlobalEmissionFilter,
  GlobalFilterState,
} from "./Types"

const initialFilter: GlobalEmissionFilter = {
  countries: [],
  companies: [],
  categories: [],
  timeRange: {
    from: 0,
    to: 0,
  },
}

const initialState: GlobalFilterState = {
  availableValues: { ...initialFilter },
  selectedValues: { ...initialFilter },
}

const updateAvailableFilterValues = (
  state: GlobalFilterState,
  newAvailableValues: GlobalEmissionFilter,
) => {
  state.availableValues = { ...newAvailableValues }

  Object.keys(state.selectedValues)
    .map((filterProperty) => filterProperty as keyof GlobalEmissionFilter)
    .forEach((filterKey) => {
      if (!Array.isArray(state.selectedValues[filterKey])) {
        return
      }

      const allValues = state.availableValues[filterKey] as string[]
      const currentSelectedValues = state.selectedValues[filterKey] as string[]
      state.selectedValues[filterKey] = _.intersection(
        allValues,
        currentSelectedValues,
      ) as string[] & DateTimeRangeFilter
    })
}

const setAvailableValuesReducer: CaseReducer<
  GlobalFilterState,
  PayloadAction<GlobalEmissionFilter>
> = (state, action) => {
  updateAvailableFilterValues(state, action.payload)
}

const clearAvailableValuesReducer: CaseReducer<
  GlobalFilterState,
  PayloadAction
> = (state) => {
  updateAvailableFilterValues(state, initialFilter)
}

const setFilterReducer: CaseReducer<
  GlobalFilterState,
  PayloadAction<GlobalEmissionFilter>
> = (state, action) => {
  state.selectedValues = { ...action.payload }
}

const clearFilterReducer: CaseReducer<GlobalFilterState, PayloadAction> = (
  state,
) => {
  state.selectedValues = { ...initialFilter }
}

export const globalFilterSlice = createSlice({
  name: "globalFilter",
  initialState,
  reducers: {
    setAvailableValues: setAvailableValuesReducer,
    clearAvailableValues: clearAvailableValuesReducer,
    setFilter: setFilterReducer,
    clearFilter: clearFilterReducer,
  },
})

export const {
  setAvailableValues,
  clearAvailableValues,
  setFilter,
  clearFilter,
} = globalFilterSlice.actions
export default globalFilterSlice.reducer
