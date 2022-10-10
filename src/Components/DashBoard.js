import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";

import Button from "./Button";

import './DashBoard.css'
const DashBoard = props => {
  const [state, dispatch] = useContext(GlobalContext);
  const {uid, displayName, photoURL, email} = state.user;
  const first = displayName.split(' ')[0];
  // return (<div><h1>{`Hello ${displayName}! UID: ${uid} email: ${email} ${photoURL}`}</h1></div>);
  return (
    <div className="px-4">
      <div className="dashboard container mx-auto rounded bg-white mt-2">
        <div className="dashboard-header pt-7 text-center">
          <h1 className=" text-2xl md:text-5xl">Hello, {first}</h1>
        </div>
        <div className="dashboard-avatar pt-7 pb-7">
          <img className="mx-auto rounded-full" src={photoURL} alt="user avatar"/>
        </div>
        <div className="dashboard-buttons flex flex-col max-w-xs mx-auto mt-5">
          <Button label="Create Room" onClick={() => console.log('click')}/>
          <Button label="Join Room" onClick={() => console.log('click')}/>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;