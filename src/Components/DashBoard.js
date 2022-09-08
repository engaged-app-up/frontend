import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";

const DashBoard = props => {
  const [state, dispatch] = useContext(GlobalContext);
  const {uid, displayName, photoURL, email} = state.user;
  return (<div><h1>{`Hello ${displayName}! UID: ${uid} email: ${email} ${photoURL}`}</h1></div>);
}

export default DashBoard;