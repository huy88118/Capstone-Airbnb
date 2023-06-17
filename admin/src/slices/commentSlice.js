import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsAPI from "../services/commentAPI";

const initialState = {
    comments : [],
    loading: false,
    error: null,

    commentsByRoom: [],
    loadingCommentsByRoom: false,
    errorCommentsByRoom : null,
}

export const getComments = createAsyncThunk(
    "comments/getComments",
    async () => {
        try {
            const data = await commentsAPI.getComments();
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const getCommentsByRoom = createAsyncThunk(
    "comments/getCommentByRoom",
    async (idRoom) => {
        try {
            const data = await commentsAPI.getCommentsByRoom(idRoom);
            return data;
        } catch (error) {
            throw error;
        }
    }
)

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComments.pending, (state,action) => {
            return {...state, loading: true};
        });
        builder.addCase(getComments.fulfilled, (state, action) => {
            return {...state, loading: false, comments: action.payload};
        });
        builder.addCase(getComments.rejected, (state,action) => {
            return {...state, loading: false, error: action.error.message};
        });
        
        // Get comments by room
        builder.addCase(getCommentsByRoom.pending, (state,action) => {
            return {...state, loadingCommentsByRoom: true};
        });
        builder.addCase(getCommentsByRoom.fulfilled, (state,action) => {
            return {...state, loadingCommentsByRoom: false, commentsByRoom: action.payload};
        });
        builder.addCase(getCommentsByRoom.rejected, (state,action) => {
            return {...state, loadingCommentsByRoom: false, errorCommentsByRoom: action.error.message};
        });
    }
})


export default commentsSlice.reducer;