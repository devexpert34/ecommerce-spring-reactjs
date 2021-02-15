import axios from 'axios';
import {API_BASE_URL} from "../../utils/constants/url";
import {getPerfumes} from "../actions/admin-actions";
import {
    fetchPerfumesByFilterParamsSuccess,
    fetchPerfumesByGenderSuccess,
    fetchPerfumesByPerfumerSuccess,
    fetchPerfumeSuccess
} from "../actions/perfume-actions";

export const fetchPerfumes = () => async (dispatch: any) => {
    const response = await axios.get(API_BASE_URL + "/home");
    dispatch(getPerfumes(response.data));
};

export const fetchPerfume = (id: number) => async (dispatch: any) => {
    const response = await axios.get(API_BASE_URL + "/home/product/" + id);
    dispatch(fetchPerfumeSuccess(response.data));
};

export const fetchPerfumesByGender = (gender: string) => async (dispatch: any) => {
    const response = await axios.post(API_BASE_URL + "/menu/gender", gender);
    dispatch(fetchPerfumesByGenderSuccess(response.data));
};

export const fetchPerfumesByPerfumer = (perfumer: string) => async (dispatch: any) => {
    const response = await axios.post(API_BASE_URL + "/menu/perfumer", perfumer);
    dispatch(fetchPerfumesByPerfumerSuccess(response.data));
};

export const fetchPerfumesByFilterParams = (filter: any) => async (dispatch: any) => {
    const response = await axios.post(API_BASE_URL + "/menu/search", filter);
    dispatch(fetchPerfumesByFilterParamsSuccess(response.data));
};
