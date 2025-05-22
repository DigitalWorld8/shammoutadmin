import { createSlice } from '@reduxjs/toolkit';
import { addNewUserService, changeUserPasswordService, deleteUserService, getDepartmentsService, getRolesService, getUsersService, updateUserService } from '../services/usersService';

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

interface AuthState {
    isLoading: boolean;
    isLoadingDelete: boolean;
    isLoadingDeparatments: boolean;
    isLoadingAdd: boolean;
    isLoadingChPass: boolean;
    isLoadingEdit: boolean;
    isLoadingRoles: boolean;
    users: User[];
    departments: string[];
    roles: string[];
    page: number | null;
    totalCount: number | null;
    pageSize: number | null;
}

const initialState: AuthState = {
    isLoading: false,
    isLoadingAdd: false,
    isLoadingDelete: false,
    isLoadingDeparatments: false,
    isLoadingChPass: false,
    isLoadingEdit: false,
    isLoadingRoles: false,
    users: [],
    departments: [],
    roles: [],
    page: null,
    totalCount: null,
    pageSize: null,
};

const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsersService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.items;
                state.page = action.payload.page;
                state.totalCount = action.payload.totalCount;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(getUsersService.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(addNewUserService.pending, (state) => {
                state.isLoadingAdd = true;
            })
            .addCase(addNewUserService.fulfilled, (state, action) => {
                state.isLoadingAdd = false;
            })
            .addCase(addNewUserService.rejected, (state) => {
                state.isLoadingAdd = false;
            });
        builder
            .addCase(deleteUserService.pending, (state) => {
                state.isLoadingDelete = true;
            })
            .addCase(deleteUserService.fulfilled, (state, action) => {
                state.isLoadingDelete = false;
            })
            .addCase(deleteUserService.rejected, (state) => {
                state.isLoadingDelete = false;
            });
        builder
            .addCase(getDepartmentsService.pending, (state) => {
                state.isLoadingDeparatments = true;
            })
            .addCase(getDepartmentsService.fulfilled, (state, action) => {
                state.departments = action.payload;
                state.isLoadingDeparatments = false;
            })
            .addCase(getDepartmentsService.rejected, (state) => {
                state.isLoadingDeparatments = false;
            })
            .addCase(changeUserPasswordService.pending, (state) => {
                state.isLoadingChPass = true;
            })
            .addCase(changeUserPasswordService.fulfilled, (state, action) => {
                state.isLoadingChPass = false;
            })
            .addCase(changeUserPasswordService.rejected, (state) => {
                state.isLoadingChPass = false;
            })
            .addCase(updateUserService.pending, (state) => {
                state.isLoadingEdit = true;
            })
            .addCase(updateUserService.fulfilled, (state, action) => {
                state.isLoadingEdit = false;
            })
            .addCase(updateUserService.rejected, (state) => {
                state.isLoadingEdit = false;
            })
            .addCase(getRolesService.pending, (state) => {
                state.isLoadingRoles = true;
            })
            .addCase(getRolesService.fulfilled, (state, action) => {
                const data = action.payload;
                state.roles = data;
                state.isLoadingRoles = false;
            })
            .addCase(getRolesService.rejected, (state) => {
                state.isLoadingRoles = false;
            });
    },
});

export default authSlice.reducer;
