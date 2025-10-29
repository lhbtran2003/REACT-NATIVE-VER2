import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

type stateType = {
  user: [],
  status: string,
  error: string | null | undefined
}
const initialState: stateType = {
    user: [],
    status: 'idle',
    error: null 
}

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async() => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
        return response.data // giá trị này sẽ được đưa vào action.payload
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.user = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }

})