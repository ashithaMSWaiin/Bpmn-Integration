import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface processModelerInitialState {
                    loading: boolean;
                    processModelers: any;
                    error: string;
                    }; 

                    export const processModelerState: processModelerInitialState = {
                    loading: false,
                    processModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const processModelerSlice = createSlice({
                    name: "processModeler",
                    initialState: processModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default processModelerSlice.reducer;