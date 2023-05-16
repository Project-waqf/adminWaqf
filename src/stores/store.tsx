import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from './loginSLice'
import alertModalReducer from './alertModalSlice';
import { draftSlice } from "./draftSilce";

export default configureStore ({
    reducer:{
        auth: authSlice.reducer,
        alertModal: alertModalReducer,
        draft: draftSlice.reducer
    }
})