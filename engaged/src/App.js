import logo from "./logo.svg";
import React, {useState, useEffect } from "react";
import * as Sentry from "@sentry/react";
import "./App.css";
  
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!hello ? "Loading..." : hello}</p>
      </header>
    </div>
  );
}
export default App;