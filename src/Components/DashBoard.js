import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import './DashBoard.css'
const DashBoard = props => {
  const [state, dispatch] = useContext(GlobalContext);
  const {uid, displayName, photoURL, email} = state.user;
  const first = displayName.split(' ')[0];
  // return (<div><h1>{`Hello ${displayName}! UID: ${uid} email: ${email} ${photoURL}`}</h1></div>);
  return (
    <div className="px-4">
      <div className="container mx-auto text-center">
        <div className="dashboard-header pt-7 text-center">
          <h1 className=" text-2xl md:text-5xl">Hello, {first}</h1>
        </div>
        <div className="dashboard-avatar pt-7">
          <img className="mx-auto rounded-full" src={photoURL} alt="user avatar"/>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;