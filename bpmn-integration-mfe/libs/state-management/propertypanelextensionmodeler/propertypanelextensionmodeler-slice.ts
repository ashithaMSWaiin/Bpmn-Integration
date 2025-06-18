import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface PropertyPanelExtensionModelerInitialState {
                    loading: boolean;
                    PropertyPanelExtensionModelers: any;
                    error: string;
                    }; 

                    export const PropertyPanelExtensionModelerState: PropertyPanelExtensionModelerInitialState = {
                    loading: false,
                    PropertyPanelExtensionModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const PropertyPanelExtensionModelerSlice = createSlice({
                    name: "PropertyPanelExtensionModeler",
                    initialState: PropertyPanelExtensionModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default PropertyPanelExtensionModelerSlice.reducer;