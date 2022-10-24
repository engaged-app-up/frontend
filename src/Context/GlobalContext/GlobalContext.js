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
    //function to get the dbId of the user since state is assigned with firebase user object onAuthStateChange below. 
    //called after onAuthStateChage and assigns an id prop to the state object so we have access to this globally.
    const getDbId = async (uid, token) => {
      let response;
      try {
        response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${uid}/dbId`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          response = await response.json();
          dispatch({
            type: 'SET_DBID',
            payload: {
              id: response.id
            }
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
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
        getDbId(user.uid, user.accessToken);
        // ...
      } else {
        dispatch({
          type: 'LOGOUT'
        })
      }
      dispatch({ type: 'STOP_LOADING' })
    });
  }, [])

  return (<GlobalContext.Provider value={[state, dispatch]}>
    {state.loading ? <CircleLoader cssOverride={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} /> : props.children}
  </GlobalContext.Provider>)
}