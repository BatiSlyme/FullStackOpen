import { createSlice } from '@reduxjs/toolkit';

// export const filter = (content) => {
//   return ({
//     type: 'FILTER',
//     data: { content }
//   });
// }

// export const filterReducer = (state = 'ALL', action) => {
//   switch (action.type) {
//     case 'FILTER':
//       return action.data.content;
//     default:
//       return state;
//   }
// }

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
        filter(state, action) {
            return action.payload;
        }
    }
});

export const { filter } = filterSlice.actions;
export default filterSlice.reducer;