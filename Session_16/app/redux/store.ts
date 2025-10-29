import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './slice/counterSlice'
import  { listIntegerReducer } from './slice/listIntegerSlice'
import { displayModeReducer } from './slice/displayModeSlice'
import { userFavoriteReducer } from './slice/userFavoriteSlice'
import { languageReducer } from './slice/languageSlice'


export const store = configureStore({
    reducer: {
       counter: counterReducer,
       listInteger: listIntegerReducer,
       displayMode: displayModeReducer,
       userFavorite: userFavoriteReducer,
       language: languageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>