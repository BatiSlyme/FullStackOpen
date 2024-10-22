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

export const notifyWithTimeout = (message, timeout) => {
    return async dispatch => {
        dispatch(notify(message));
        setTimeout(() => { dispatch(clear()); }, timeout * 1000);
    }
}

export default notificationsSlice.reducer;