import { createSlice } from "@reduxjs/toolkit";

const initialState: number[] = []

const listIntegerSlice = createSlice({
  name: 'listInteger',
  initialState,
  reducers: {
     createRandomInteger: (state) => {
        const randomInteger = Math.random()
        state.push(randomInteger)
     }
  }
})

export const {createRandomInteger} = listIntegerSlice.actions
export const listIntegerReducer = listIntegerSlice.reducer