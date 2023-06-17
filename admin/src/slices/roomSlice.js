import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomAPI from "../services/RoomAPI";

const initialState = {
    rooms : [],
    loading: false,
    error: null,

    room: null,
    loadingRoom : false,
    errorRoom : null
}

export const getRooms = createAsyncThunk(
    "rooms/getRoom",
    async () => {
        try {
            const data = await roomAPI.getRoom();
            return data;
        } catch (error) {
            throw error
        }
    }
);

export const getRoomById = createAsyncThunk(
    "room/getRoomById",
    async (id) => {
        try {
            const data = await roomAPI.getRoomById(id);
            return data
        } catch (error) {
            throw error;
        }
    }
)

const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        setRoomNull : (state,action) => {
            return {...state, room: null};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRooms.pending, (state,action) => {
            return {...state, loading: true};
        });
        builder.addCase(getRooms.fulfilled, (state, action) => {
            return {...state, loading: false, rooms: action.payload};
        });
        builder.addCase(getRooms.rejected, (state, action) => {
            return {...state, loading: false, error: action.error.message};
        });

        // Get room by id
        builder.addCase(getRoomById.pending, (state,action) => {
            return {...state, loadingRoom: true};
        });
        builder.addCase(getRoomById.fulfilled, (state,action) => {
            return {...state, loadingRoom: false, room: action.payload};
        });
        builder.addCase(getRoomById.rejected, (state,action) => {
            return {...state, loadingRoom: false, errorRoom: action.error.message};
        });
    },
})

export const { setRoomNull } = roomSlice.actions;

export default roomSlice.reducer;