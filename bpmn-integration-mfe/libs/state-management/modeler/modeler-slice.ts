import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface modelerInitialState {
                    loading: boolean;
                    modelers: any;
                    error: string;
                    }; 

                    export const modelerState: modelerInitialState = {
                    loading: false,
                    modelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const modelerSlice = createSlice({
                    name: "modeler",
                    initialState: modelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default modelerSlice.reducer;