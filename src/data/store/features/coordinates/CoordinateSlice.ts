import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit"

import {
  DataPoint,
  DateTimeRangeFilter,
  EmissionStorage,
  PerceivedData,
} from "./Types"
import { coordinateApi } from "./CoordinateClient"

const MOST_WINDOWS_OF_INTEREST = 12

const initialState: EmissionStorage = {
  wholeDataSet: {
    data: {},
  },
  visibleFrame: {
    allPoints: [],
    byCompany: [],
    byCountry: [],
  },
}

const produceVisibleIndexedData = (
  dataPoints: Array<DataPoint>,
): PerceivedData => {
  const byCompany = dataPoints.reduce(
    (accumulator: any, currentPoint: DataPoint) => {
      const currentCompany = currentPoint.company
      if (!accumulator[currentCompany]) {
        accumulator[currentCompany] = {}
      }
      const accumulatorForCompany = accumulator[currentCompany]
      if (!accumulatorForCompany.emissionsByCategory) {
        accumulatorForCompany.emissionsByCategory = {}
      }

      const currCategory = currentPoint.category.toLowerCase()
      if (!accumulatorForCompany.emissionsByCategory[currCategory]) {
        accumulatorForCompany.emissionsByCategory[currCategory] = 0
      }

      accumulatorForCompany.company = currentCompany
      accumulatorForCompany.emissionsByCategory[currCategory] +=
        currentPoint.emission_amount

      return accumulator
    },
    {},
  )

  const byCountry = dataPoints.reduce(
    (accumulator: any, currentPoint: DataPoint) => {
      const currentCountry = currentPoint.location.country
      if (!accumulator[currentCountry]) {
        accumulator[currentCountry] = {}
      }

      const accumulatorForCountry = accumulator[currentCountry]
      if (!accumulatorForCountry.emissionsByCategory) {
        accumulatorForCountry.emissionsByCategory = {}
      }

      const currCategory = currentPoint.category.toLowerCase()
      if (!accumulatorForCountry.emissionsByCategory[currCategory]) {
        accumulatorForCountry.emissionsByCategory[currCategory] = 0
      }

      accumulatorForCountry.country = currentCountry
      accumulatorForCountry.emissionsByCategory[currCategory] +=
        currentPoint.emission_amount

      return accumulator
    },
    {},
  )

  return {
    allPoints: dataPoints,
    byCompany: Object.values(byCompany),
    byCountry: Object.values(byCountry),
  }
}

const extractVisibleDataPoints = (state: EmissionStorage) => {
  const allDates = Object.keys(state.wholeDataSet.data)
  // const { from, to } = dateFilter

  const datesOfInterest = allDates // .slice(from, to)

  const filteredDataPoints = datesOfInterest.flatMap(
    (timeWindowMark) => state.wholeDataSet.data[timeWindowMark],
  )

  state.visibleFrame = produceVisibleIndexedData(filteredDataPoints)
}

const changeVisibleDates: CaseReducer<
  EmissionStorage,
  PayloadAction<DateTimeRangeFilter>
> = (state) => {
  // state.filter = action.payload
  extractVisibleDataPoints(state)
}

export const coordinateSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    changeVisibileDates: changeVisibleDates,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      coordinateApi.endpoints.getRandomCoordinates.matchFulfilled,
      (state, action) => {
        // Joining date partitions
        const newData = {
          ...state.wholeDataSet.data,
          ...action.payload.data,
        }
        const timestampsOfInterest = Object.keys(newData)
          .sort()
          .slice(-MOST_WINDOWS_OF_INTEREST)
        state.wholeDataSet.data = Object.fromEntries(
          timestampsOfInterest.map((timeMoment) => [
            timeMoment,
            newData[timeMoment],
          ]),
        )
        extractVisibleDataPoints(state)
      },
    )
  },
})

export const { changeVisibileDates } = coordinateSlice.actions
export default coordinateSlice.reducer
