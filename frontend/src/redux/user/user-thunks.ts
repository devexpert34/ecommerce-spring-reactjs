import { Dispatch } from "redux";

import {
    loadingUserInfo,
    setUpdatedUser,
    setUser,
    userAddedReviewFailure,
    userAddedReviewSuccess,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess
} from "./user-actions";
import { ReviewData, UserEdit, UserResetPasswordData } from "../../types/types";
import RequestService from "../../utils/request-service";
import { userByQuery } from "../../utils/graphql-query/users-query";
import { setPerfume } from "../perfume/perfume-actions";
import {
    AUTH_EDIT_PASSWORD,
    USERS_EDIT,
    USERS_GRAPHQL_INFO,
    USERS_INFO,
    USERS_REVIEW
} from "../../constants/urlConstants";

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
    dispatch(loadingUserInfo());
    const response = await RequestService.get(USERS_INFO, true);
    dispatch(setUser(response.data));
};

export const updateUserInfo = (userEdit: UserEdit) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put(USERS_EDIT, userEdit, true);
        dispatch(setUpdatedUser(response.data));
    } catch (error) {
        dispatch(userUpdatedFailure(error.response.data));
    }
};

export const updateUserPassword = (data: UserResetPasswordData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put(AUTH_EDIT_PASSWORD, data, true);
        dispatch(userUpdatedPasswordSuccess(response.data));
    } catch (error) {
        dispatch(userUpdatedPasswordFailure(error.response.data));
    }
};

export const addReviewToPerfume = (review: ReviewData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post(USERS_REVIEW, review);
        dispatch(setPerfume(response.data));
        dispatch(userAddedReviewSuccess());
    } catch (error) {
        dispatch(userAddedReviewFailure(error.response.data));
    }
};

// GraphQL query
export const fetchUserInfoByQuery = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingUserInfo());
    const response = await RequestService.post(USERS_GRAPHQL_INFO, { query: userByQuery(id) }, true);
    dispatch(setUser(response.data.data.user));
};
