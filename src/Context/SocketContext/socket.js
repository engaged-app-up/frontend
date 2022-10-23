import React, {useState, useContext, useCallback, useEffect} from "react";
import socketio from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_BACKEND_URL;

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = React.createContext();
