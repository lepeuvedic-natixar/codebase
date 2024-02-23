import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit'

import { DataPoint, DateFilter, EmissionStorage, PerceivedData } from '../../types/Types'
import { coordinateApi } from './CoordinateClient'

let initialState: EmissionStorage = {
    wholeDataSet: {
        min_time: Date.now() - (60 * 60 * 1000),
        max_time: Date.now(),
        categories: [],
        companies: [],
        countries: [],
        data: {}
    },
    visibleFrame: {
        allPoints: [],
        byCompany: [],
        byCountry: []
    }
}

const produceVisibleIndexedData = (dataPoints: Array<DataPoint>): PerceivedData => {
    const byCompany = dataPoints.reduce((accumulator: any, currentPoint: DataPoint) => {
        const currentCompany = currentPoint.company
        if (!accumulator[currentCompany]) {
            accumulator[currentCompany] = {};
        }

        const currCategory = currentPoint.category.toLowerCase()
        if (!accumulator[currentCompany][currCategory]) {
            accumulator[currentCompany][currCategory] = 0;
        }
        accumulator[currentCompany][currCategory] += currentPoint.emission_amount;
        accumulator[currentCompany]["company"] = currentCompany
        return accumulator;
    }, {});

    const byCountry = dataPoints.reduce((accumulator: any, currentPoint: DataPoint) => {
        const currentCountry = currentPoint.location.country
        if (!accumulator[currentCountry]) {
            accumulator[currentCountry] = {};
        }

        const currCategory = currentPoint.category.toLowerCase()
        if (!accumulator[currentCountry][currCategory]) {
            accumulator[currentCountry][currCategory] = 0;
        }
        accumulator[currentCountry][currCategory] += currentPoint.emission_amount;
        accumulator[currentCountry]["country"] = currentCountry
        return accumulator;
    }, {});

    return {
        allPoints: dataPoints,
        byCompany: Object.values(byCompany),
        byCountry: Object.values(byCountry)
    }
}

const extractFilterValues = (
    state: EmissionStorage
) => {
    const categories = new Set<string>()
    const companies = new Set<string>()
    const countries = new Set<string>()

    Object.values(state.wholeDataSet.data).forEach(dataPoints => {
        dataPoints.forEach(dataPoint => {
            const { company, category } = dataPoint
            const country = dataPoint.location.country
            companies.add(company)
            categories.add(category)
            countries.add(country)
        })
    })

    state.wholeDataSet.categories = Array.from(categories).map(category => category.toLowerCase())
    state.wholeDataSet.companies = Array.from(companies)
    state.wholeDataSet.countries = Array.from(countries)
}

const extractVisibleDataPoints = (
    state: EmissionStorage,
    dateFilter: DateFilter
) => {
    const { from, to } = dateFilter
    const allDates = Object.keys(state.wholeDataSet.data)
    const datesOfInterest = allDates
        .filter((dateStr) => {
            let dateEpoch = parseInt(dateStr)
            return from <= dateEpoch && dateEpoch <= to
        })

    const filteredDataPoints: Array<DataPoint> = []
    datesOfInterest.forEach(dateStr => {
        const dataByDate = state.wholeDataSet.data[dateStr]
        filteredDataPoints.push(...dataByDate)
    })

    state.visibleFrame = produceVisibleIndexedData(filteredDataPoints)
}

const changeVisibleDates: CaseReducer<EmissionStorage, PayloadAction<DateFilter>> = (state, action) => {
    extractVisibleDataPoints(state, action.payload)
}

export const coordinateSlice = createSlice({
    name: 'coordinates',
    initialState,
    reducers: {
        changeVisibileDates: changeVisibleDates
    },
    extraReducers: (builder) => {
        builder.addMatcher(coordinateApi.endpoints.getRandomCoordinates.matchFulfilled, (state, action) => {
            state.wholeDataSet = action.payload
            const dateFilter: DateFilter = {
                from: state.wholeDataSet.min_time,
                to: state.wholeDataSet.max_time
            }
            extractFilterValues(state)
            extractVisibleDataPoints(state, dateFilter)
        })
    }
})

export const { changeVisibileDates } = coordinateSlice.actions
export default coordinateSlice.reducer