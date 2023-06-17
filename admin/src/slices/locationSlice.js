import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import locationsAPI from "../services/locationsAPI";

const initialState = {
    locations : [],
    loading: false,
    error: null,

    locationById: null,
    loadingLocationById: false,
    errorLocationById: null,
}

export const getLocations = createAsyncThunk(
    "locations/getLocations",
    async () => {
        try {
            const data = await locationsAPI.getLocations();
        return data;
        } catch (error) {
            throw error;
        }
    }
)

export const getLocationById = createAsyncThunk(
    "locations/getLocationById",
    async (id) => {
        try {
            const data = await locationsAPI.getLocationById(id);
            return data;
        } catch (error) {
            throw error;
        }
    }
)

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLocations.pending, (state, action) => {
            return {...state, loading: true};
        });
        builder.addCase(getLocations.fulfilled, (state,action) => {
            return {...state, loading: false, locations: action.payload};
        });
        builder.addCase(getLocations.rejected, (state,action) => {
            return {...state, loading: false, error: action.error.message};
        });

        builder.addCase(getLocationById.pending, (state,action) => {
            return {...state, loadingLocationById: true};
        });
        builder.addCase(getLocationById.fulfilled, (state,action) => {
            return {...state, loadingLocationById: false, locationById: action.payload};
        });
        builder.addCase(getLocationById.rejected, (state,action) => {
            return {...state, loadingLocationById: false, errorLocationById: action.error.message};
        });
    },
})


export default locationSlice.reducer;