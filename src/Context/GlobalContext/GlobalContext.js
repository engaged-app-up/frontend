import React, { createContext, useState, useReducer, useEffect } from 'react';
import { contextReducer } from './reducer';
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const GlobalContext = createContext();
export const ContextWrapper = (props) => {
    const auth = getAuth();
    const initialState = {
        user: "",
        token: "",
        loading: false,
    }
    const [state, dispatch] = useReducer(contextReducer, initialState);
    useEffect(() => {
      dispatch({type: 'SET_LOADING'})
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
            } 
            dispatch({type: 'STOP_LOADING'})
          });
    }, [auth.currentUser])

    return (<GlobalContext.Provider value={[state, dispatch]}>
        {props.children}
    </GlobalContext.Provider>)
}