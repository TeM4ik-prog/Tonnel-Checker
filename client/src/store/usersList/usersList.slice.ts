import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
    updateTrigger: false,
    search: ''
};

export const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.list = action.payload;
        },

        updateData: (state) => {
            state.updateTrigger = !state.updateTrigger
        },

        search: (state, action) => {
            state.search = action.payload
        },
    },
});

export const { setUsers, updateData, search } = usersListSlice.actions;

export default usersListSlice.reducer;