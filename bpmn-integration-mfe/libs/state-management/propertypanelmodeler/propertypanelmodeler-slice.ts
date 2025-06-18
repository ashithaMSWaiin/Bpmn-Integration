import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface PropertyPanelModelerInitialState {
                    loading: boolean;
                    PropertyPanelModelers: any;
                    error: string;
                    }; 

                    export const PropertyPanelModelerState: PropertyPanelModelerInitialState = {
                    loading: false,
                    PropertyPanelModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const PropertyPanelModelerSlice = createSlice({
                    name: "PropertyPanelModeler",
                    initialState: PropertyPanelModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default PropertyPanelModelerSlice.reducer;