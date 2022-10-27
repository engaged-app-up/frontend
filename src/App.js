import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
// import Header from "./Components/Header";
import { ContextWrapper } from "./Context/GlobalContext/GlobalContext";
import DashBoard from "./Components/DashBoard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Room from "./Components/Room";
import Channel from "./Components/Channel";
import { SocketContext, socket } from "./Context/SocketContext/socket";

import './App.css';


function App() {
  useEffect(() => {
    // callBackendAPI();
  }, [])

  return (
    <>
      <ContextWrapper>
        <SocketContext.Provider value={socket}>
          <BrowserRouter>
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>}></Route>
              <Route path="/room/:uuid" element={<ProtectedRoute><Room /></ProtectedRoute>}></Route>
              <Route path="/chat" element={<Channel />} />
            </Routes>
          </BrowserRouter>
        </SocketContext.Provider>
      </ContextWrapper>
    </>

  )
}
export default App;