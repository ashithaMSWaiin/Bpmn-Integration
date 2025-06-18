import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface ExampleBpmnModelerInitialState {
                    loading: boolean;
                    ExampleBpmnModelers: any;
                    error: string;
                    }; 

                    export const ExampleBpmnModelerState: ExampleBpmnModelerInitialState = {
                    loading: false,
                    ExampleBpmnModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const ExampleBpmnModelerSlice = createSlice({
                    name: "ExampleBpmnModeler",
                    initialState: ExampleBpmnModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default ExampleBpmnModelerSlice.reducer;