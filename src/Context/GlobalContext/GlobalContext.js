import React, { createContext, useState, useReducer, useEffect } from 'react';
import { contextReducer } from './reducer';
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const GlobalContext = createContext();
export const ContextWrapper = (props) => {
    const auth = getAuth();
    const initialState = {
        user: auth.currentUser ? auth.currentUser : '',
        token: auth.currentUser ? auth.currentUser.accessToken : '',
        loading: false,
    }
    const [state, dispatch] = useReducer(contextReducer, initialState);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              dispatch({
                type: 'LOGIN', 
                payload: {
                    user: user,
                    token: user.accessToken
                }
              })
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    }, [])

    return (<GlobalContext.Provider value={[state, dispatch]}>
        {props.children}
    </GlobalContext.Provider>)
}