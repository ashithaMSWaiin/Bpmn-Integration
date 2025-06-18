import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

                    export interface CommentModelerInitialState {
                    loading: boolean;
                    CommentModelers: any;
                    error: string;
                    }; 

                    export const CommentModelerState: CommentModelerInitialState = {
                    loading: false,
                    CommentModelers: {},
                    error: "",
                    };

                    // Add your Api call here

                    const CommentModelerSlice = createSlice({
                    name: "CommentModeler",
                    initialState: CommentModelerState,
                    reducers: {},
                    extraReducers: (builder) => {
                        // Add your extraReducers here
                    }})

                    export default CommentModelerSlice.reducer;