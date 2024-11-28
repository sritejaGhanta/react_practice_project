import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './app.reducer'
import LoaderReducer from './loder.reducer'

export default configureStore({
  reducer: {
    user: UserReducer,
    loader: LoaderReducer
  },
})