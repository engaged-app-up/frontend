export const contextReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: true
            }
        case "STOP_LOADING":
            return {
                ...state,
                loading: false
            }
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false
            }
        case 'LOGOUT':
            return {
                ...state,
                user: "",
                token: "",
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            }
    }
}