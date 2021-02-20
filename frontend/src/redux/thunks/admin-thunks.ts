import axios from 'axios';

import {API_BASE_URL} from "../../utils/constants/url";
import {
    addPerfumeFailure,
    addPerfumeSuccess,
    getAllUsers,
    getAllUsersOrders,
    getPerfumes,
    getUser,
    reset,
    updatePerfumeFailure,
    updatePerfumeSuccess
} from "../actions/admin-actions";
import {Dispatch} from "redux";

export const addPerfume = (data: FormData) => async (dispatch: Dispatch) => {
    try {
        await axios({
            method: "POST",
            url: API_BASE_URL + "/admin/add",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            }
        });
        window.scrollTo(0, 0);
        dispatch(addPerfumeSuccess());
    } catch (error) {
        dispatch(addPerfumeFailure(error.response.data));
    }
};

export const fetchPerfumes = () => async (dispatch: Dispatch) => {
    const response = await axios.get(API_BASE_URL + "/home");
    dispatch(getPerfumes(response.data));
};

export const updatePerfume = (data: FormData, history: any) => async (dispatch: Dispatch) => {
    try {
        const response = await axios({
            method: "PUT",
            url: API_BASE_URL + "/admin/edit",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            }
        });
        dispatch(updatePerfumeSuccess(response.data));
        history.push("/account");
    } catch (error) {
        dispatch(updatePerfumeFailure(error.response.data));
    }
};

export const fetchAllUsersOrders = () => async (dispatch: Dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/orders",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    dispatch(getAllUsersOrders(response.data));
};

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/user/all",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    dispatch(getAllUsers(response.data));
};

export const fetchUser = (id: string) => async (dispatch: Dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/user/" + id,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    dispatch(getUser(response.data));
};

export const formReset = () => async (dispatch: Dispatch) => {
    dispatch(reset());
};
