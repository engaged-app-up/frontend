import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";

const ProtectedRoute = (props) => {
  const [state, dispatch] = useContext(GlobalContext);

  if (state.loading) return <h1>LOADING..</h1>
  if (!state.user) return <h1>You must login.</h1>

  return (
    <>
      {props.children}
    </>
  )
}

export default ProtectedRoute;