
import { createSlice } from "@reduxjs/toolkit";

export enum DisplayMode {
    GRID = "grid",
    LIST = "list",
}

const initialState = {
    mode: DisplayMode.GRID
}

const displayModeSlice = createSlice({
    name: 'displayMode',
    initialState,
    reducers: {
        changeToGridMode: (state) => {
            state.mode = DisplayMode.GRID
        },
        changeToListMode: (state) => {
            state.mode = DisplayMode.LIST
        }
    }

})

export const {changeToGridMode, changeToListMode} = displayModeSlice.actions
export const displayModeReducer = displayModeSlice.reducer