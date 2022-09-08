import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const [state, dispatch] = useContext(GlobalContext);

  if (!state.user) return <Navigate to="/" />

  return (
    <>
      {props.children}
    </>
  )
}

export default ProtectedRoute;