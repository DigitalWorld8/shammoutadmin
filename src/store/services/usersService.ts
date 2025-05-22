import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authenticationAPi, Departments, getAllRoles } from '../urls';
import { apiClient } from '../../axios/axioxConfig';

interface User {
    code: string;
    department: string;
    email: string;
    firstName: string;
    lastLogIn: string;
    lastName: string;
    numberOfLogIn: number;
    reason: string;
    roles: string[];
    status: string;
}
interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    filters?: string[];
    statusFilters?: string[];
    code?: string[];
}
interface DeletedUser {
    code: string;
    isdeleted: boolean;
}
interface ForgetUserPassword {
    email: string;
}
interface GetUsersResponse {
    items: User[];
    totalCount: number;
    pageSize: number;
    page: number;
}

export const getUsersService = createAsyncThunk<
    GetUsersResponse,
    {
        page: number;
        pageSize: number;
        username?: string;
        email?: string;
        filters?: string[];
    },
    { rejectValue: any }
>('users/getUsersService', async ({ page, pageSize, username, email, filters = [] }, thunkAPI) => {
    try {
        const filtersParam = filters.length > 0 ? `&filters=${filters.join(',')}` : '';
        const url = `${authenticationAPi}/get-all-users?page=${page}&pageSize=${pageSize}${filtersParam}`;

        const response = await apiClient.get<GetUsersResponse>(url);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});

export const addNewUserService = createAsyncThunk<void, NewUser, { rejectValue: string }>('users/addNewUserService', async (newUserData, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');

        await apiClient.post(`${authenticationAPi}/AddNewUser`, newUserData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});
export const updateUserService = createAsyncThunk<void, NewUser, { rejectValue: string }>('users/updateUserService', async ({ data, code }, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');

        await apiClient.put(`${authenticationAPi}/UpdateUserProfile/${code}`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});

export const changeUserPasswordService = createAsyncThunk<void, NewUser, { rejectValue: string }>('users/changeUserPasswordService', async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');

        await apiClient.post(`${authenticationAPi}/ResetPassword`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});

export const deleteUserService = createAsyncThunk<void, DeletedUser, { rejectValue: string }>('users/deleteUserService', async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');

        await apiClient.post(`${authenticationAPi}/FakeDelete`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});
export const forgetUserService = createAsyncThunk<void, ForgetUserPassword, { rejectValue: string }>('users/forgetUserService', async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');

        await apiClient.post(`${authenticationAPi}/ForgotPassword`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});
export const getDepartmentsService = createAsyncThunk<string[], void, { rejectValue: string }>('users/getDepartmentsService', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`${authenticationAPi}/${Departments}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});
export const getRolesService = createAsyncThunk<string[], void, { rejectValue: string }>('users/getRolesService', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`${authenticationAPi}/${getAllRoles}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message || 'Something went wrong');
    }
});
