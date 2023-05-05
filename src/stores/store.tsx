import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from './loginSLice'
import alertModalReducer from './alertModalSlice';

export default configureStore ({
    reducer:{
        auth: authSlice.reducer,
        alertModal: alertModalReducer
    }
})