import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface overlayModelerInitialState {
                    loading: boolean;
                    overlayModelers: any;
                    error: string;
                    }; 

                    export const overlayModelerState: overlayModelerInitialState = {
                    loading: false,
                    overlayModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const overlayModelerSlice = createSlice({
                    name: "overlayModeler",
                    initialState: overlayModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default overlayModelerSlice.reducer;