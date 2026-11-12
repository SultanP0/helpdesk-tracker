import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
        <Link to="/">Tickets</Link>
        <Link to="/new">New Tickets</Link>
    </nav>
  )
}

export default Navbar
