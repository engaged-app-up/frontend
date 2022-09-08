import React, { createContext, useState, useReducer, useEffect } from 'react';
import { contextReducer } from './reducer';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CircleLoader } from 'react-spinners';
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
    console.log('use effect running.')
    dispatch({ type: 'SET_LOADING' })
    onAuthStateChanged(auth, (user) => {
      console.log('on auth state changed running')
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch({
          type: 'SET_USER',
          payload: {
            user: user,
            token: user.accessToken
          }
        })
        // ...
      }
      dispatch({ type: 'STOP_LOADING' })
    });
  }, [])

  return (<GlobalContext.Provider value={[state, dispatch]}>
    {state.loading ? <CircleLoader cssOverride={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} /> : props.children}
  </GlobalContext.Provider>)
}