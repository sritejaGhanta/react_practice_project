import { createSlice } from "@reduxjs/toolkit";

const loader = createSlice({
    name: 'loader',
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

export const { startLoader, stopLoader } = loader.actions;

const notfication = createSlice({
    name: 'Pop up notification',
    initialState: null,
    reducers: {
        setNotification: (state:any, data:any) => {
            state = {};
            state.message = data?.payload?.message;
            state.success = data?.payload?.success;
            return state
        }
    }
})
export const { setNotification } = notfication.actions;

export default {
    loader: loader.reducer,
    notification: notfication.reducer,
}




