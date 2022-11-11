import React, { createContext, useState, useReducer, useEffect } from 'react';
import { contextReducer } from './reducer';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CircleLoader } from 'react-spinners';
import { socket } from '../SocketContext/socket';

export const GlobalContext = createContext();
export const ContextWrapper = (props) => {
  const auth = getAuth();
  const initialState = {
    user: "",
    token: "",
    loading: false,
  }

  //function to get the dbId of the user since state is assigned with firebase user object onAuthStateChange below. 
  //called after onAuthStateChage and assigns an id prop to the state object so we have access to this globally.
  const getDbUser = async (uid, token) => {
    let response;
    try {
      response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/dbuser`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'uid': uid
        }
      })

      if (response.ok) {
        response = await response.json();
        socket.userId = await response.id
        await socket.emit('set_user_id', response.id);
        const { id, uid, displayName, email, role } = response;
        const user = {
          id,
          uid,
          displayName,
          email,
          role,

        }
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const setUserInGlobalState = async (fbUser) => {
    let userFromDb = await getDbUser(fbUser.uid, fbUser.accessToken);
    userFromDb.photoURL = fbUser.photoURL;
    const token = fbUser.accessToken;
    dispatch({
      type: 'SET_USER',
      payload: {
        user: userFromDb,
        token: token
      }
    })
    socket.userId = userFromDb.id;
  }

  const [state, dispatch] = useReducer(contextReducer, initialState);
  useEffect(() => {
    console.log('use effect running.')
    dispatch({ type: 'SET_LOADING' })
    onAuthStateChanged(auth, (user) => {
      console.log('on auth state changed running')
      if (user) {
        setUserInGlobalState(user);
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