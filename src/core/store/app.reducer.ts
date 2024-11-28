import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

const Reducer = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        setUser: (state, action: any) => {
            state = action.payload;
            return state;
        },
        updateUser: (state, action: any) => {
            state = { ...state, ...action.payload };
            return state;
        },
        clearUser: (state:any) => {
            state = {};
            return state;
        }

    }
})

export const { setUser, updateUser , clearUser} = Reducer.actions;

export default Reducer.reducer;

