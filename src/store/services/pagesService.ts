
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authenticationAPi, BASE_CMS_PROD_URL, baseUrl, CMS_PORT, Component, ComponentMetadata, CustomForm, FirstResetPassword, ForgetPassword, getSubPath, login, LogInWithOTP, Page, ResetPassword, Segment, StaticComponent } from '../urls';
import { apiClient } from '../../axios/axioxConfig';
import { getHeadres } from '../../utils/headres';
// ======================== logInService =======================
const sliceName = `pages`;
interface CreatePageRequest {
    pageUrlName: string;
    language: string;
    pos: string;
    title: string;
    description: string;
}

interface CreatePageResponse {
    message: string;
    pageId: number;
}
interface createSegmentRequest {
    pageID: string;
    name: string;
    position: string;
    description: string;
}

interface createSegmentResponse {
    pageID: string;
    id: number;
    name: string;
    position: string;
    description: string;
    components: string
}

export interface Page {
    id: number;
    pageUrlName: string;
    language: string;
    pos: string;
    title: string;
    isDeleted: boolean;
    status: string;
    description: string;
    segments: any[];
}
interface SubPathResponse {
    // Define the actual structure of your response if known
    data: any[];
}
// ============================================== PAGES ================================================================
// ======================== GET PAGE BY SUB PATH =======================
export const getSubPathService = createAsyncThunk<
    SubPathResponse,
    { country: string; language: string, pageUrlName: string },
    { rejectValue: any }
>(
    'pages/getSubPathService',
    async ({ country, language, pageUrlName }, thunkAPI) => {
        try {
            const response = await apiClient.get(
                `${BASE_CMS_PROD_URL}/${getSubPath}/${country}/${language}/${pageUrlName}`,
                {
                    headers: getHeadres(),
                }
            );
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
)
// ======================== GET PAGE BY SUB URL =======================

export const getPageBySubUrlService = createAsyncThunk<
    SubPathResponse,
    { country: string; language: string, pageUrlName: string },
    { rejectValue: any }
>(
    'pages/getPageBySubUrlService',
    async ({ country, language, pageUrlName }, thunkAPI) => {
        try {
            const response = await apiClient.get(
                `${BASE_CMS_PROD_URL}/${Page}/${country}/${language}/${pageUrlName}`,
                {
                    headers: getHeadres(),
                }
            );
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
)
// ======================== GET PAGES =======================

export const getPagesService = createAsyncThunk<
    { items: Page[]; totalCount: number; page: number; pageSize: number },
    { country: string, language: string },
    { rejectValue: any }
>(
    `${sliceName}/getPagesService`,
    async ({ country, language }, thunkAPI) => {
        try {
            // Construct the URL with query parameters
            const url = `${BASE_CMS_PROD_URL}/Page?filters=pos@=${country},language@=${language}`;

            // Make the API call with the constructed URL
            const response = await apiClient.get(url, {
                headers: getHeadres(),
            });

            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);


// ======================== GET PAGE BY ID =======================
export const getPageByIdService = createAsyncThunk<
    Page,                 // what the fulfilled action payload will be
    number,               // the type of the `id` argument
    { rejectValue: any }
>(
    `${sliceName}/getPageByIdService`,
    async (id, thunkAPI) => {
        try {
            const response = await apiClient.get(`${BASE_CMS_PROD_URL}/${Page}/${id}`, {
                headers: getHeadres()
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);

// ======================== CREATE PAGE  =======================
export const createPageService = createAsyncThunk<CreatePageResponse, CreatePageRequest, { rejectValue: any }>(
    `${sliceName}/createPageService`,
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.post(`${BASE_CMS_PROD_URL}/${Page}`, data,
                {
                    headers: getHeadres()
                });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ======================== UPDATE PAGE =======================
export const updatePageService = createAsyncThunk<CreatePageResponse, CreatePageRequest, { rejectValue: any }>(
    `${sliceName}/updatePageService`,
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.put(`${BASE_CMS_PROD_URL}/${Page}`, data,
                {
                    headers: getHeadres()
                });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ======================== DELETE PAGE SEERVICE =======================
export const deletePageService = createAsyncThunk<
    { id: number },
    number,
    { rejectValue: any }
>(
    `${sliceName}/deletePageService`,
    async (id, thunkAPI) => {
        try {
            const response = await apiClient.delete(`${BASE_CMS_PROD_URL}/${Page}/${id}`, {
                headers: getHeadres(),
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ============================================== SEGMENTS ================================================================

// ======================== UPDATE SEGMENT SERVICE =======================
export const updateSegmentService = createAsyncThunk<CreatePageResponse, CreatePageRequest, { rejectValue: any }>(
    `${sliceName}/updateSegmentService`,
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.put(`${BASE_CMS_PROD_URL}/${Segment}`, data,
                {
                    headers: getHeadres()
                });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ======================== CREATE SEGMENT SERVICE =======================
export const createSegmentService = createAsyncThunk<createSegmentResponse, createSegmentRequest, { rejectValue: any }>(
    `${sliceName}/createSegmentService`,
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.post(`${BASE_CMS_PROD_URL}/${Segment}`, data,
                {
                    headers: getHeadres()
                });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ======================== DELETE SEGMENT SEERVICE =======================
export const deleteSegmentService = createAsyncThunk<
    { id: number },
    number,
    { rejectValue: any }
>(
    `${sliceName}/deleteSegmentService`,
    async (id, thunkAPI) => {
        try {
            const response = await apiClient.delete(`${BASE_CMS_PROD_URL}/${Segment}/${id}`,
                {
                    headers: getHeadres()
                });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ======================== COMPONENTS =======================
// ======================== createPageService =======================
export interface CreateComponentRequest {
    segmentID: number;
    type: string;
    content: string; // Stored as a JSON string
    position: number;
}
export interface CreateComponentResponse {
    id: number;
    segmentID: number;
    type: string;
    content: string; // Stored as a JSON string
    position: number;
}
// ======================== GET STATIC COMPONENT  =======================
// export const getStaticComponentsService = createAsyncThunk<CreateComponentResponse, void, { rejectValue: any }>(
//     `${sliceName}/getStaticComponentsService`,
//     async (_, thunkAPI) => {
//         try {
//             const response = await apiClient.get(
//                 `${baseUrl}/${StaticComponent}`,
//                 {
//                     headers: getHeadres(),
//                 }
//             );
//             return response.data;
//         } catch (e: any) {
//             return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
//         }
//     }
// );
interface ComponentItem {
    id: number;
    type: string;
    content: string; // Content is a string, but it looks like a JSON array, so you could parse it later if needed
    position: number;
}

// Define the structure of the entire response
interface GetStaticComponentsResponse {
    items: ComponentItem[];
    totalCount: number;
    page: number;
    pageSize: number;
}

// Define the reject value (error) type
interface RejectValue {
    message: string;
}


export const getStaticComponentsService = createAsyncThunk<
    { rejectValue: any }
>(
    'pages/getStaticComponentsService',
    async (_, thunkAPI) => {
        try {
            const response = await apiClient.get(
                `${BASE_CMS_PROD_URL}/${StaticComponent}`,
                {
                    headers: getHeadres(),
                }
            );
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
)
interface StaticComponentData {
    id: number;
    type: string;
    content: string;
}

interface EditStaticComponentArgs {
    data: StaticComponentData;
}

interface EditStaticComponentResponse {
    id: number;
    type: string;
    content: string;
}
// ======================== EDIT  CONST COMPONENT  =======================

export const editStaticComponentsService = createAsyncThunk<
    EditStaticComponentResponse,
    EditStaticComponentArgs,
    { rejectValue: any }
>(
    'pages/editStaticComponentsService',
    async ({ data }, thunkAPI) => {
        try {
            const response = await apiClient.put<EditStaticComponentResponse>(
                `${BASE_CMS_PROD_URL}/${StaticComponent}`,
                data,
                {
                    headers: getHeadres(),
                }
            );
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ======================== CREATE COMPONENT  =======================

export const createComponentService = createAsyncThunk<CreateComponentResponse, CreateComponentRequest, { rejectValue: any }>(
    `${sliceName}/createComponentService`,
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.post(`${BASE_CMS_PROD_URL}/${Component}`, data,
                {
                    headers: getHeadres()
                });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ======================== UPDATE COMPONENT  =======================

export const updateComponentService = createAsyncThunk<CreateComponentResponse, CreateComponentRequest, { rejectValue: any }>(
    `${sliceName}/updateComponentService`,
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.put(`${BASE_CMS_PROD_URL}/${Component}`, data,
                {
                    headers: getHeadres()
                });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
// ======================== GET COMPONENTS META DATA =======================
export const getMetaDataService = createAsyncThunk<
    { rejectValue: any }
>(
    'pages/getMetaDataService',
    async (_, thunkAPI) => {
        try {
            const response = await apiClient.get(
                `${BASE_CMS_PROD_URL}/${ComponentMetadata}`,
                {
                    headers: getHeadres(),
                }
            );
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
)
// ======================== DELETE Component SEERVICE =======================
export const deleteComponentService = createAsyncThunk<
    { id: number },
    number,
    { rejectValue: any }
>(
    `${sliceName}/deleteComponentService`,
    async (id, thunkAPI) => {
        try {
            const response = await apiClient.delete(`${BASE_CMS_PROD_URL}/${Component}/${id}`,
                {
                    headers: getHeadres()
                });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);
export const getFormsService = createAsyncThunk<
    void,
    {
        page: number;
        pageSize: number;

    },
    { rejectValue: any }
>(
    `${sliceName}/getFormsService`,
    async ({ page, pageSize }, thunkAPI) => {
        try {
            const url = `${BASE_CMS_PROD_URL}/${CustomForm}?page=${page}&pageSize=${pageSize}`;

            const response = await apiClient.get(url,
                {
                    headers: getHeadres()
                });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);