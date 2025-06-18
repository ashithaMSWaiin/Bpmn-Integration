import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface transactionBoundaryModelerInitialState {
                    loading: boolean;
                    transactionBoundaryModelers: any;
                    error: string;
                    }; 

                    export const transactionBoundaryModelerState: transactionBoundaryModelerInitialState = {
                    loading: false,
                    transactionBoundaryModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const transactionBoundaryModelerSlice = createSlice({
                    name: "transactionBoundaryModeler",
                    initialState: transactionBoundaryModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default transactionBoundaryModelerSlice.reducer;