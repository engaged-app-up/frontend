export const contextReducer = (state, action) => {
    switch(action.type) {
        case "REQ_LOGIN": 
        return {
            ...state,
            loading: true
        }
        case "LOGIN": 
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.auth_token,
            loading: false
        }
        case 'LOGOUT': 
        return {
            ...state,
            user: "",
            token: ""
        }
        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            }
    }
}