import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_GALLERY_PROD_URL, FILES_BASE_URL, FilesUrl, FileURL, Gallery, GalleryUrl } from '../urls';
import { apiClient } from '../../axios/axioxConfig';
import { getHeadres } from '../../utils/headres';
const sliceName = `gallery`;

// ======================== GET GALLERY BY ID =======================
export const getGalleryByIdService = createAsyncThunk<
    { id: number },
    number,
    { rejectValue: any }
>(
    `${sliceName}/getPageByIdService`,
    async ({ id }, thunkAPI) => {
        try {
            const response = await apiClient.get(`${BASE_GALLERY_PROD_URL}/${FileURL}/${id}`, {
                headers: getHeadres()
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ======================== GET FILES BY GALLERY ID =======================
export const getFilesBtGalleryIdService = createAsyncThunk<
    any, // Adjust return type as needed
    { id: string; searchTerm?: string },
    { rejectValue: any }
>(
    `${sliceName}/getFilesBtGalleryIdService`,
    async ({ id, searchTerm }, thunkAPI) => {
        try {
            const response = await apiClient.get(`${BASE_GALLERY_PROD_URL}/${FileURL}/${id}`, {
                headers: getHeadres(),
                params: searchTerm ? { search: searchTerm } : undefined,
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);

// ======================== DELETE FILE BY  ID =======================
export const deleteFileService = createAsyncThunk<
    { id: string },
    number,
    { rejectValue: any }
>(
    `${sliceName}/deleteFileService`,
    async ({ id }, thunkAPI) => {
        try {
            const response = await apiClient.delete(`${BASE_GALLERY_PROD_URL}/${FileURL}/${id}`, {
                headers: getHeadres()
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
export const createFileService = createAsyncThunk<
    { data: any },
    FormData, // Payload is now FormData
    { rejectValue: any }
>(
    `${sliceName}/createFileService`,
    async ({ data }, thunkAPI) => {
        try {
            const response = await apiClient.post(`${BASE_GALLERY_PROD_URL}/${FileURL}`, data, {
                headers: {
                    ...getHeadres(),
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);


export const getFilesService = createAsyncThunk<
    any, // Replace with actual return type
    { galleryid: number; searchTerm?: string; filetype?: string },
    { rejectValue: any }
>(
    `${sliceName}/getFilesService`,
    async ({ galleryid, searchTerm, filetype }, thunkAPI) => {
        try {
            const filterParts = [`galleryid==${galleryid}`];

            if (filetype) {
                filterParts.push(`filetype@=${filetype}`);
            }

            if (searchTerm) {
                filterParts.push(`title@=${encodeURIComponent(searchTerm)}`);
            }

            const filters = filterParts.join(',');

            const response = await apiClient.get(`${BASE_GALLERY_PROD_URL}/${FileURL}`, {
                headers: {
                    ...getHeadres(),
                },
                params: {
                    filters,
                },
            });

            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);


export const updateFileService = createAsyncThunk<
    { data: any },
    FormData, // Payload is now FormData
    { rejectValue: any }
>(
    `${sliceName}/updateFileService`,
    async ({ data }, thunkAPI) => {
        try {
            const response = await apiClient.put(`${BASE_GALLERY_PROD_URL}/${FileURL}`, data, {
                headers: {
                    ...getHeadres(),
                }
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);