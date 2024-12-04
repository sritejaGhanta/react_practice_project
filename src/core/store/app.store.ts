import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './app.reducer'
import CommonReducer from './common.reducer'

export default configureStore({
  reducer: {
    user: UserReducer,
    loader: CommonReducer.loader,
    notification: CommonReducer.notification
  },
})