import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Header from "./Components/Header";
import { ContextWrapper, GlobalContext } from "./Context/GlobalContext/GlobalContext";
import DashBoard from "./Components/DashBoard";
import ProtectedRoute from "./Components/ProtectedRoute";
import { getAuth } from "firebase/auth";
import Chat from "./Components/Chat";
import Channel from "./Components/Channel";
import { SocketContext, socket } from "./Context/SocketContext/socket";

import './App.css';


function App() {
  const [hello, setHello] = useState("");

  const callBackendAPI = async () => {
    const response = await fetch('http://localhost:3001');
    const data = await response.json();
    setHello(data.msg)
    if (!response.ok) {
      throw new Error("Network response was not OK!");
    }

  }
  useEffect(() => {
    // callBackendAPI();
  }, [])

  return (
    <>
      <ContextWrapper>
        <SocketContext.Provider value={socket}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>}></Route>
              <Route path="/chat" element={<Channel />} />
            </Routes>
          </BrowserRouter>
        </SocketContext.Provider>
      </ContextWrapper>
    </>

  )
}
export default App;