import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface translateBpmnModelerInitialState {
                    loading: boolean;
                    translateBpmnModelers: any;
                    error: string;
                    }; 

                    export const translateBpmnModelerState: translateBpmnModelerInitialState = {
                    loading: false,
                    translateBpmnModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const translateBpmnModelerSlice = createSlice({
                    name: "translateBpmnModeler",
                    initialState: translateBpmnModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default translateBpmnModelerSlice.reducer;