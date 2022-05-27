import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingStatus, Order, OrderError, OrderItem } from "../../types/types";
import { addOrder, fetchOrderById, fetchOrderItemsByOrderId } from "./order-thunks";

export interface OrderState {
    order: Partial<Order>;
    orderItems: Array<OrderItem>;
    errors: Partial<OrderError>;
    errorMessage: string;
    loadingState: LoadingStatus;
}

export const initialState: OrderState = {
    order: {},
    orderItems: [],
    errors: {},
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderLoadingState(state, action: PayloadAction<LoadingStatus>) {
            state.loadingState = action.payload;
        },
        resetOrderState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderById.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchOrderById.fulfilled, (state, action) => {
            state.order = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchOrderById.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
        builder.addCase(fetchOrderItemsByOrderId.fulfilled, (state, action) => {
            state.orderItems = action.payload;
        });
        builder.addCase(addOrder.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.order = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(addOrder.rejected, (state, action) => {
            state.errors = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
    }
});

export const { setOrderLoadingState, resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
