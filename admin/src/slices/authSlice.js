import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../services/authAPI";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
}

export const login = createAsyncThunk(
    "auth/login",
    async (values) => {
        try {
            const user = await authAPI.login(values);
            localStorage.setItem("user", JSON.stringify(user.user));
            localStorage.setItem("token", JSON.stringify(user.token));
            return user.user;
        } catch (error) {
            throw error;
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state,action) => {
            localStorage.removeItem("user");
            return {...state, user: null}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            return {...state, loading: true};
        });
        builder.addCase(login.fulfilled, (state,action) => {
            return {...state, loading: false, user: action.payload};
        });
        builder.addCase(login.rejected, (state, action) => {
            return {...state, loading: false, error: action.error.message}
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;