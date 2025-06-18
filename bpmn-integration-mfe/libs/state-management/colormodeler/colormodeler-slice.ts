import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface ColorModelerInitialState {
                    loading: boolean;
                    ColorModelers: any;
                    error: string;
                    }; 

                    export const ColorModelerState: ColorModelerInitialState = {
                    loading: false,
                    ColorModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const ColorModelerSlice = createSlice({
                    name: "ColorModeler",
                    initialState: ColorModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default ColorModelerSlice.reducer;