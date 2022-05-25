import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthErrors, LoadingStatus } from "../../types/types";
import {
    activateAccount,
    fetchResetPasswordCode,
    forgotPassword,
    login,
    registration,
    resetPassword
} from "./auth-thunks";

export interface AuthState {
    email: string;
    isRegistered: boolean;
    loadingState: LoadingStatus;
    success: string;
    error: string;
    errors: Partial<AuthErrors>;
}

const initialState: AuthState = {
    email: "",
    isRegistered: false,
    loadingState: LoadingStatus.LOADING,
    success: "",
    error: "",
    errors: {}
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthLoadingState(state, action: PayloadAction<LoadingStatus>) {
            state.loadingState = action.payload;
            state.errors = {};
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        registerSuccess(state) {
            state.isRegistered = true;
            state.loadingState = LoadingStatus.LOADED;
            state.errors = {};
        },
        registerFailure(state, action: PayloadAction<AuthErrors>) {
            state.errors = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        activateAccountSuccess(state, action: PayloadAction<string>) {
            state.success = action.payload;
        },
        activateAccountFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        forgotPasswordSuccess(state, action: PayloadAction<string>) {
            state.success = action.payload;
            state.loadingState = LoadingStatus.LOADED;
            state.errors = {};
            state.error = "";
        },
        forgotPasswordFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        resetPasswordCodeSuccess(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        resetPasswordCodeFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        resetPasswordSuccess(state, action: PayloadAction<string>) {
            state.success = action.payload;
        },
        resetPasswordFailure(state, action: PayloadAction<AuthErrors>) {
            state.errors = action.payload;
        },
        resetAuthState(state) {
            state = { ...initialState, loadingState: LoadingStatus.LOADED };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload!;
        });
        builder.addCase(registration.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(registration.fulfilled, (state, action) => {
            state.isRegistered = true;
            state.loadingState = LoadingStatus.LOADED;
            state.errors = {};
        });
        builder.addCase(registration.rejected, (state, action) => {
            state.errors = action.payload!;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(activateAccount.fulfilled, (state, action) => {
            state.success = action.payload;
        });
        builder.addCase(activateAccount.rejected, (state, action) => {
            state.error = action.payload!;
        });
        builder.addCase(forgotPassword.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.success = action.payload;
            state.loadingState = LoadingStatus.LOADED;
            state.errors = {};
            state.error = "";
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.error = action.payload!;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchResetPasswordCode.fulfilled, (state, action) => {
            state.email = action.payload;
        });
        builder.addCase(fetchResetPasswordCode.rejected, (state, action) => {
            state.error = action.payload!;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.success = action.payload;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.errors = action.payload!;
        });
    }
});

export const {
    setAuthLoadingState,
    loginFailure,
    registerSuccess,
    registerFailure,
    activateAccountSuccess,
    activateAccountFailure,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordCodeSuccess,
    resetPasswordCodeFailure,
    resetPasswordSuccess,
    resetPasswordFailure,
    resetAuthState
} = authSlice.actions;
export default authSlice.reducer;
