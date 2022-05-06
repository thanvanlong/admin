import { SET_USER } from "./Module.action";

const initState = {
    listUsers: [],
    listOrder: [],
}

export const adminReducer = (state = initState, action) =>{
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                listUsers: action.payload
            }
        default: 
            return state;
    }
}