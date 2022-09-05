import React, { createContext, useState, useReducer } from 'react';
import { contextReducer } from './reducer';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export const GlobalContext = createContext();
export const ContextWrapper = (props) => {
    const auth = getAuth();
    const initialState = {
        user: auth.currentUser || "",
        token: auth.currentUser.accessToken || "",
        loading: false,
    }
    const [state, dispatch] = useReducer(contextReducer, initialState);
    return (<GlobalContext.Provider value={[state, dispatch]}>
        {props.children}
    </GlobalContext.Provider>)
}