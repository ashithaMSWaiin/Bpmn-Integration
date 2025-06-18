import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface DynamicExampleBpmnModelerInitialState {
                    loading: boolean;
                    DynamicExampleBpmnModelers: any;
                    error: string;
                    }; 

                    export const DynamicExampleBpmnModelerState: DynamicExampleBpmnModelerInitialState = {
                    loading: false,
                    DynamicExampleBpmnModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const DynamicExampleBpmnModelerSlice = createSlice({
                    name: "DynamicExampleBpmnModeler",
                    initialState: DynamicExampleBpmnModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default DynamicExampleBpmnModelerSlice.reducer;