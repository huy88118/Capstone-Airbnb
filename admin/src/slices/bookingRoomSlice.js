import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingRoomAPI from "../services/bookingRoomAPI";

const initialState = {
    bookingRooms : [],
    loading: false,
    error: null,

    booking :null,
    loadingBooking: false,
    errorBooking: null,
    
}

export const getBookingRooms = createAsyncThunk(
    "bookingRoom/getBooking",
    async () => {
        try {
            const data = await bookingRoomAPI.getBookingRooms();
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const getBookingById = createAsyncThunk(
    "bookingRoom/getBookingById",
    async (id) => {
        try {
            const data = await bookingRoomAPI.getBookingById(id);
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const getBookingByUser = createAsyncThunk(
    "bookingRoom/getBookingByUser",
    async (idUser) => {
        try {
            const data = await bookingRoomAPI.getBookingByUser(idUser);
            return data;
        } catch (error) {
            throw error;
        }
    }
)

const bookingRoomSlice = createSlice({
    name: "bookingRoom",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBookingRooms.pending, (state,action) => {
            return {...state, loading: true};
        });
        builder.addCase(getBookingRooms.fulfilled, (state, action) => {
            return {...state, loading: false, bookingRooms: action.payload};
        });
        builder.addCase(getBookingRooms.rejected, (state,action) => {
            return {...state, loading: false, error: action.error.message};
        });

        // Get booking by id
        builder.addCase(getBookingById.pending, (state,action) => {
            return {...state, loadingBooking: true};
        });
        builder.addCase(getBookingById.fulfilled, (state,action) => {
            return {...state, loadingBooking: false, booking: action.payload};
        });
        builder.addCase(getBookingById.rejected, (state,action) => {
            return {...state, loadingBooking: false, error: action.error.message};
        });

        //Get booking by user
        builder.addCase(getBookingByUser.pending, (state,action) => {
            return {...state, loading: true};
        });
        builder.addCase(getBookingByUser.fulfilled, (state,action) => {
            return {...state, loading: false, bookingRooms: action.payload};
        });
        builder.addCase(getBookingByUser.rejected, (state,action) => {
            return {...state, loading: false, error: action.error.message};
        });
    }
})

export default bookingRoomSlice.reducer;