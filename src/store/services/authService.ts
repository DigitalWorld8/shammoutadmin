import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { auth, Authentication, authenticationAPi, BASE_PROD_URL, FirstResetPassword, ForgetPassword, LOG_IN_PORT, login, LogInWithOTP, ResetPassword } from '../urls';
import { getHeadres } from '../../utils/headres';
import { apiClient } from '../../axios/axioxConfig';

const sliceName = `auth`;
interface LoginRequest {
    password: string;
    email?: string;
    confirmPassword?: string;
    token?: string;
}
interface ResetRequest {
    email?: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    numberOfLogin: number | null;
    message: string;
}
// ======================== logInService =======================

export const logInService = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: any }>(`${sliceName}/logInService`, async (data, thunkAPI) => {
    try {
        const response = await apiClient.post(`${BASE_PROD_URL}/${auth}/${Authentication}/${login}`, data);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
});
// ======================== logInOtpService =======================


export const logInOtpService = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: any }>(`${sliceName}/logInOtpService`, async (data, thunkAPI) => {
    try {
        const response = await apiClient.post(`${BASE_PROD_URL}/${auth}/${Authentication}/${LogInWithOTP}`, data, {
            headers: getHeadres(),
        });

        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});
// ======================== resetPasswordService =======================

export const resetPasswordService = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: any }>(`${sliceName}/resetPasswordService`, async (data, thunkAPI) => {
    try {
        const response = await apiClient.post(`${BASE_PROD_URL}/${auth}/${Authentication}/${ResetPassword}`, data, {
            headers: getHeadres(),
        });

        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});
// ======================== FirstResetPasswordService =======================

export const FirstResetPasswordService = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: any }>(`${sliceName}/FirstResetPasswordService`, async (data, thunkAPI) => {
    try {
        const response = await apiClient.post(`${BASE_PROD_URL}/${auth}/${Authentication}/${FirstResetPassword}`, data, {
            headers: getHeadres(),
        });

        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});
export const ResetPasswordService = createAsyncThunk<LoginResponse, ResetRequest, { rejectValue: any }>(`${sliceName}/ResetPasswordService`, async (data, thunkAPI) => {
    try {
        const response = await apiClient.post(`${BASE_PROD_URL}/${auth}/${Authentication}/${ResetPassword}`, data, {
            headers: getHeadres(),
        });

        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});
