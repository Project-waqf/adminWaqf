import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertModalState } from '../utils/types/DataType';

const initialState: AlertModalState = {
    open: false,
    loading: false,
    label: '',
};

const alertModalSlice = createSlice({
    name: 'alertModal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<string>) {
        state.open = true;
        state.label = action.payload;
        },
        closeModal(state) {
        state.open = false;
        state.loading = false;
        state.label = '';
        },
        startLoading(state) {
        state.loading = true;
        },
        stopLoading(state) {
        state.loading = false;
        },
    },
});

export const {
    openModal,
    closeModal,
    startLoading,
    stopLoading,
} = alertModalSlice.actions;

export default alertModalSlice.reducer;