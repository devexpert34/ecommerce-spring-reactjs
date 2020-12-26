import axios from 'axios';

import {
    LOGIN_SUCCESS,
    FORM_RESET,
    REGISTER_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_FAILURE,
    LOGOUT_SUCCESS
} from "../utils/constants/actions-types";
import {API_BASE_URL} from "../utils/constants/url";

export const login = (data, history) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/login", data);

        localStorage.setItem("email", response.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.userRole);
        localStorage.setItem("isLoggedIn", true);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })

        history.push("/account");
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data
        })
    }
};

export const formReset = () => async (dispatch) => {
    dispatch({
        type: FORM_RESET,
    })
};

export const registration = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/registration", data);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data
        })
    }
};

export const logout = () => async (dispatch) => {
    localStorage.clear();

    dispatch({
        type: LOGOUT_SUCCESS
    })
}