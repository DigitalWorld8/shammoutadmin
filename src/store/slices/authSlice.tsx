import { createSlice } from '@reduxjs/toolkit';
import { FirstResetPasswordService, logInOtpService, logInService, ResetPasswordService, resetPasswordService } from '../services/authService';

interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    token: string;
    mode: string;
    numberOfLogin: number | null;
    userName: string;
    email: string,
    expiresOn: string,
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: false,
    token: '',
    mode: '',
    userName: '',
    email: '',
    expiresOn: '',
    numberOfLogin: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // ======================== logInService =======================

            .addCase(logInService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logInService.fulfilled, (state, action) => {
                const { token, numberOfLogin, email, lastName, firstName,expiresOn } = action.payload;
                state.userName = firstName + " " + lastName
                state.email = email
                state.expiresOn = expiresOn
                state.isLoading = false;
                state.isLoggedIn = true;
                state.token = token;
                state.numberOfLogin = numberOfLogin;
                localStorage.setItem('token', token);
            })

            .addCase(logInService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== logInOtpService =======================
            .addCase(logInOtpService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logInOtpService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoading = false;
                state.isLoggedIn = true;
                state.token = data.token;
            })
            .addCase(logInOtpService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== resetPasswordService =======================
            .addCase(resetPasswordService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPasswordService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoading = false;
            })
            .addCase(resetPasswordService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== FirstResetPasswordService =======================
            .addCase(FirstResetPasswordService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FirstResetPasswordService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoading = false;
            })
            .addCase(FirstResetPasswordService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== ResetPasswordService =======================
            .addCase(ResetPasswordService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ResetPasswordService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoading = false;
            })
            .addCase(ResetPasswordService.rejected, (state) => {
                state.isLoading = false;
            })
    },
});
export const { setMode } = authSlice.actions;

export default authSlice.reducer;
