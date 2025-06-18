import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface minimapmodelerInitialState {
                    loading: boolean;
                    minimapmodelers: any;
                    error: string;
                    }; 

                    export const minimapmodelerState: minimapmodelerInitialState = {
                    loading: false,
                    minimapmodelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const minimapmodelerSlice = createSlice({
                    name: "minimapmodeler",
                    initialState: minimapmodelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default minimapmodelerSlice.reducer;