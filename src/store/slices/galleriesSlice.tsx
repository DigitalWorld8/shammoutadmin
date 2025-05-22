import { createSlice } from '@reduxjs/toolkit';
import { logInService, } from '../services/authService';
import { createFileService, deleteFileService, getFilesBtGalleryIdService, getFilesService, getGalleryByIdService, updateFileService } from '../services/galleriesService';

// Interface for the gallery info
interface GalleryInfo {
    id: number;
    code: string;
    description: string;
    name: string;
    createdDate: string;
    createdBy: string;
    modifiedDate: string | null;
    modifiedBy: string | null;
    type: string;
    fileTypes: string[];
}
interface file {

}
// Interface for your Redux state
interface GalleryState {
    isLoading: boolean;
    isLoadingDelete: boolean;
    isLoadingCreate: boolean;
    isLoadingForms: boolean;
    galleryInfo: GalleryInfo | null;
    files: file[];
    galleryId: number
}
const initialState: GalleryState = {
    isLoading: false,
    isLoadingDelete: false,
    isLoadingCreate: false,
    isLoadingForms: false,
    galleryInfo: null,
    files: [],
    forms: [],
    galleryId: 2
};
const galleriesSlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // ======================== GET GALLERY BY ID =======================

            .addCase(getGalleryByIdService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGalleryByIdService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoading = false;
                state.galleryInfo = data
            })
            .addCase(getGalleryByIdService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== GET FILES BY GALLERY ID =======================

            .addCase(getFilesBtGalleryIdService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFilesBtGalleryIdService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoading = false;
                state.files = data
            })
            .addCase(getFilesBtGalleryIdService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== GET FILES BY GALLERY ID =======================

            .addCase(deleteFileService.pending, (state) => {
                state.isLoadingDelete = true;
            })
            .addCase(deleteFileService.fulfilled, (state, action) => {
                state.isLoadingDelete = false;
            })
            .addCase(deleteFileService.rejected, (state) => {
                state.isLoadingDelete = false;
            })
            .addCase(createFileService.pending, (state) => {
                state.isLoadingCreate = true;
            })
            .addCase(createFileService.fulfilled, (state, action) => {
                state.isLoadingCreate = false;
            })
            .addCase(createFileService.rejected, (state) => {
                state.isLoadingCreate = false;
            })
            .addCase(updateFileService.pending, (state) => {
                state.isLoadingCreate = true;
            })
            .addCase(updateFileService.fulfilled, (state, action) => {
                state.isLoadingCreate = false;
            })
            .addCase(updateFileService.rejected, (state) => {
                state.isLoadingCreate = false;
            })
            .addCase(getFilesService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFilesService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoading = false;
                state.files = data
            })
            .addCase(getFilesService.rejected, (state) => {
                state.isLoading = false;
            })

    },
});
// export const { setMode } = galleriesSlice.actions;

export default galleriesSlice.reducer;
