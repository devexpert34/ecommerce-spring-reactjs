import { createSlice } from "@reduxjs/toolkit";

import { LoadingStatus, Order } from "../../types/types";
import {
    fetchAllUsersOrders,
    fetchAllUsersOrdersByQuery,
    fetchUserOrders,
    fetchUserOrdersByEmail,
    fetchUserOrdersByEmailQuery,
    fetchUserOrdersByQuery
} from "./orders-thunks";

export interface OrdersState {
    orders: Array<Order>;
    loadingState: LoadingStatus;
}

const initialState: OrdersState = {
    orders: [],
    loadingState: LoadingStatus.LOADING
};

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        resetOrders: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserOrders.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchAllUsersOrders.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllUsersOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchUserOrdersByEmail.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserOrdersByEmail.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchUserOrdersByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserOrdersByQuery.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchAllUsersOrdersByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllUsersOrdersByQuery.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchUserOrdersByEmailQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserOrdersByEmailQuery.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const { resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
