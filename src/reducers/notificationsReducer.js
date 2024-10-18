import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        notify(state, action) {
            return [...state, action.payload];
        },
        clear(state, action) {
            return [...state.slice(1)];
        }
    }
});

export const { notify, clear } = notificationsSlice.actions;
export default notificationsSlice.reducer;