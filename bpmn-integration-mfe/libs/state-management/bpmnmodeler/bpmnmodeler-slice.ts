import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface BpmnModelerInitialState {
                    loading: boolean;
                    BpmnModelers: any;
                    error: string;
                    }; 

                    export const BpmnModelerState: BpmnModelerInitialState = {
                    loading: false,
                    BpmnModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const BpmnModelerSlice = createSlice({
                    name: "BpmnModeler",
                    initialState: BpmnModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default BpmnModelerSlice.reducer;