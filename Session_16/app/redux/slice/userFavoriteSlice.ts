import { createSlice } from "@reduxjs/toolkit";

export interface User {
    username: string,
    favorite: boolean
}
const initialState: User[] = [
    { username: "alice_smith", favorite: true },
    { username: "bob_jones", favorite: false },
    { username: "charlie_brown", favorite: true },
    { username: "david_wilson", favorite: false },
    { username: "emma_taylor", favorite: true },
];
const userFavoriteSlice = createSlice({
  name: 'userFavorite',
  initialState,
  reducers: {
    changeFavorite: (state, action) => {
        const userIndex = state.findIndex((u: User) => u.username === action.payload)
       if (userIndex != -1) {
        state[userIndex].favorite = !state[userIndex].favorite
       }
    }
  }
})

export const {changeFavorite} = userFavoriteSlice.actions
export const userFavoriteReducer = userFavoriteSlice.reducer