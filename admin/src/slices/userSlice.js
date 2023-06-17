import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../services/userAPI";

const initialState = {
  users: [],
  loading: false,
  error: null,

  user: null,
  loadingUser: false,
  errorUser: null,
};

export const getUser = createAsyncThunk("users/getUsers", async () => {
  try {
    const data = await userAPI.getUsers();
    return data;
  } catch (error) {
    throw error;
  }
});

export const getUserById = createAsyncThunk("users/getUserById", async (id) => {
  try {
    const data = await userAPI.getUserById(id);
    return data;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUserAction: (state, action) => {
      return { ...state, user: null };
    },
  },
  extraReducers: (builder) => {
    // Users
    builder.addCase(getUser.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      return { ...state, loading: false, users: action.payload };
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });

    // Get user by id
    builder.addCase(getUserById.pending, (state, action) => {
      return { ...state, loadingUser: true };
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      return { ...state, loadingUser: false, user: action.payload };
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      return { ...state, loadingUser: false, errorUser: action.error.message };
    });
  },
});

export const { deleteUserAction } = userSlice.actions;

export default userSlice.reducer;