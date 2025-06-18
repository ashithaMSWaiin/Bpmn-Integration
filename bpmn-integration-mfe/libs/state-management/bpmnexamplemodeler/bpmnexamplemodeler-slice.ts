import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface BpmnExampleModelerInitialState {
                    loading: boolean;
                    BpmnExampleModelers: any;
                    error: string;
                    }; 

                    export const BpmnExampleModelerState: BpmnExampleModelerInitialState = {
                    loading: false,
                    BpmnExampleModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const BpmnExampleModelerSlice = createSlice({
                    name: "BpmnExampleModeler",
                    initialState: BpmnExampleModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default BpmnExampleModelerSlice.reducer;