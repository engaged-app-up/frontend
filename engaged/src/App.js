import logo from "./logo.svg";
import React, {useState, useEffect } from "react";
import * as Sentry from "@sentry/react";
import "./App.css";
import Login from "./Login";
import Header from "./Header.js";
import { Outlet } from "react-router-dom";
  
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
  callBackendAPI();
}, [])
  
  return (
    <>
    <Header />
    <Login />
    </>
  )
}
export default App;