
import React, {useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Header from "./Components/Header";
  
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
useEffect (() => {
  // callBackendAPI();
}, [])
  
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>

  )
}
export default App;