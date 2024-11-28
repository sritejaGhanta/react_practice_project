import { createSlice } from "@reduxjs/toolkit";
import { USER_INTERFACE } from "../interface/user.interface";

const Loader = createSlice({
    name: 'userInfo',
    initialState: {
        value: false
    },
    reducers: {
        startLoader: (state:any) => {
            state.value = true;
        },

        stopLoader: (state:any) => {
            state.value = false;
        }
    }
})

export const { startLoader, stopLoader } = Loader.actions;

export default Loader.reducer;

