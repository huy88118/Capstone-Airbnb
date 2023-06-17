import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import roomSlice  from './slices/roomSlice';
import bookingRoomSlice from './slices/bookingRoomSlice';
import commentSlice from './slices/commentSlice';
import locationSlice from './slices/locationSlice';
import modalSlice from './slices/modalSlice';

const store = configureStore({
    reducer: {
        authSlice,
        userSlice,
        roomSlice,
        bookingRoomSlice,
        commentSlice,
        locationSlice,
        modalSlice,
    },
})

export default store;