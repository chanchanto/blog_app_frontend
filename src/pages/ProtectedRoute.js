import useStore from "../store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return (<Navigate to="/login" replace />)
  }
  return children
}

export default ProtectedRoute;