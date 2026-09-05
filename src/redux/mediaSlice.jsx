import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchvideos = createAsyncThunk(
    'media/fetchVideos',
    async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/media/videos`);
        const result = await response.json();
        return result.data;
    }
)


const mediaSlice = createSlice({
    name: 'videos',
    initialState: {
        videos: [],
        loading: true,
        error: null
    },

    extraReducers: (builder) => {
        builder.addCase(fetchvideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchvideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
            
        });
        builder.addCase(fetchvideos.rejected, (state, action) => {
            state.error =  action.error.message;
        });
    }

})


export default mediaSlice.reducer;