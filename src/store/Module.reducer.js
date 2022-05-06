import { SET_USER } from "./Module.action";

const initState = {
    listUser: [],
}

export const adminReducer = (state = initState, action) =>{
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                listUser: action.payload
            }
    }
}