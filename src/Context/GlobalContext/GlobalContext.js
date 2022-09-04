import React, { createContext, useState, useReducer } from 'react';
export const GlobalContext = createContext();

export const ContextWrapper = (props) => {
    const [state, setState] = useState({
        isLoggedIn: false,
        user: null
    })
    return (<GlobalContext.Provider value={state}>
        {props.children}
    </GlobalContext.Provider>)
}