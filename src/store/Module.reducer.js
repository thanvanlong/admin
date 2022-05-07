import { SET_ORDER_PENDING, SET_USER,  } from "./Module.action";

const initState = {
    listUsers: [],
    listOrders: [],
}

export const adminReducer = (state = initState, action) =>{
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                listUsers: action.payload
            }
        case SET_ORDER_PENDING: 
            return {
                ...state,
                listOrders: [...state.listOrders, action.payload]
            }
        default: 
            return state;
    }
}