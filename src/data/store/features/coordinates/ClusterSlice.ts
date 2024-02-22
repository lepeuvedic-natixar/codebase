import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DataPoint, SelectedCluster } from "data/store/types/Types"

const initialState: SelectedCluster = {
    dataPoints: []
}

const selectClusterPointsReducer: CaseReducer<SelectedCluster, PayloadAction<Array<DataPoint>>> = (state, action) => {
    console.log("Reducer was called")
    console.log("And received", action.payload)
    state.dataPoints = action.payload
}

export const selectedClusterSlice = createSlice({
    name: 'selectedCluster',
    initialState,
    reducers: {
        selectClusterPoints: selectClusterPointsReducer
    },
})

export const { selectClusterPoints } = selectedClusterSlice.actions
export default selectedClusterSlice.reducer