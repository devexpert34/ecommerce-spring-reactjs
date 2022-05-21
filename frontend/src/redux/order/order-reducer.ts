import { Order, OrderError } from "../../types/types";
import {
    LOADING_ORDER,
    ORDER_ADDED_FAILURE,
    OrderActionTypes,
    RESET_ORDER_STATE,
    SET_ORDER
} from "./order-action-types";

export type OrderState = {
    order: Partial<Order>;
    errors: Partial<OrderError>;
    loading: boolean;
};

const initialState: OrderState = {
    order: {},
    errors: {},
    loading: false
};

const orderReducer = (state: OrderState = initialState, action: OrderActionTypes): OrderState => {
    switch (action.type) {
        case LOADING_ORDER:
            return { ...state, loading: true };

        case SET_ORDER:
            return { ...state, order: action.payload, loading: false };

        case ORDER_ADDED_FAILURE:
            return { ...state, errors: action.payload, loading: false };

        case RESET_ORDER_STATE:
            return { ...state, errors: {}, loading: false };

        default:
            return state;
    }
};

export default orderReducer;
