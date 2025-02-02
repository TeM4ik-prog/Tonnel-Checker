import { Category } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';





interface CategoriesState {
    categories: Category[]
}


const initialState: CategoriesState = {
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },

        // getCategories: (state, action: PayloadAction<string[]>) => {
        //     state.categories = [...state.categories, ...action.payload]
        // }
    },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
