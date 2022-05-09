import { SET_COUNT_NOTIFICATION, SET_ORDER_PENDING, SET_USER,  } from "./Module.action";

const initState = {
    listUsers: [],
    listOrders: [],
    countNotifi: 0,
}
// dispatchEvent(setUser(newData))

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
                listOrders: action.payload
            }
        case SET_COUNT_NOTIFICATION: 
            const countNotifi = action.payload === 0 ? 0: state.countNotifi + 1;
            return {
                ...state,
                countNotifi: countNotifi,
            }
        default: 
            return state;
    }
}