import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice'; 
import categoriesReducer from './categories/categories.slice'; 

export const store = configureStore({
    reducer: {
        user: userReducer,
        categoriesSlice: categoriesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
