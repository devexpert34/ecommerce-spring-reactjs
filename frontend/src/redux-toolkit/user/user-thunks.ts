import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    AuthErrors,
    ReviewError,
    ReviewRequest,
    User,
    UserEditErrors,
    UserEditRequest,
    UserResetPasswordRequest
} from "../../types/types";
import RequestService from "../../utils/request-service";
import { USERS_EDIT, USERS_GRAPHQL_INFO, USERS_INFO, USERS_REVIEW } from "../../constants/urlConstants";
import { userByQuery } from "../../utils/graphql-query/users-query";

export const fetchUserInfo = createAsyncThunk<User>("user/fetchUserInfo", async () => {
    const response = await RequestService.get(USERS_INFO, true);
    return response.data;
});

export const updateUserInfo = createAsyncThunk<User, UserEditRequest, { rejectValue: UserEditErrors }>(
    "user/updateUserInfo",
    async (request, thunkApi) => {
        try {
            const response = await RequestService.put(USERS_EDIT, request, true);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const updateUserPassword = createAsyncThunk<string, UserResetPasswordRequest, { rejectValue: AuthErrors }>(
    "user/updateUserPassword",
    async (request, thunkApi) => {
        try {
            const response = await RequestService.put(USERS_EDIT, request, true);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const addReviewToPerfume = createAsyncThunk<{}, ReviewRequest, { rejectValue: ReviewError }>(
    "user/addReviewToPerfume",
    async (request, thunkApi) => {
        try {
            return await RequestService.post(USERS_REVIEW, request);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

// GraphQL query
export const fetchUserInfoByQuery = createAsyncThunk<User, string>("user/fetchUserInfoByQuery", async (userId) => {
    const response = await RequestService.post(USERS_GRAPHQL_INFO, { query: userByQuery(userId) }, true);
    return response.data.data.user;
});
