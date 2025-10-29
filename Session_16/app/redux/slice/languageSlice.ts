import { createSlice } from "@reduxjs/toolkit";

export enum Language  {
    EN = "english",
    VI = "vietnamese"
}

const initialState = {
    value: Language.EN
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
          state.value = action.payload
        }
    }

})

export const {changeLanguage} = languageSlice.actions
export const languageReducer = languageSlice.reducer
