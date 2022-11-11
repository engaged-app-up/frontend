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
        case "SET_USER":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            }
        case "SET_DBID":
            return {
                ...state,
                id: action.payload.id
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                id: "",
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            }
    }
}