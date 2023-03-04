import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found">
      404 - Not found
      <p>Go back to the <NavLink to="/">Home</NavLink>.</p>
    </div>
  );
}

export default NotFound;