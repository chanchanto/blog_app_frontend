import { NavLink, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import authApi from "../../api/authApi";
import useStore from "../../store";
import { toast } from 'react-toastify';

const Header = () => {
  const store = useStore()

  const handleLogout = async () => {
    try {
      store.actions.setIsLoadingRequest(true)

      await authApi.logout()
      
      store.actions.setIsLoggedIn(false)
      store.actions.setIsLoadingRequest(false)

      localStorage.clear()
      toast.success('You are logged out')
    } catch (error) {
      store.actions.setIsLoadingRequest(false)
      toast.error(error.message)
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link className="me-3" as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link className="me-3" as={NavLink} to="/posts/create">Write new post</Nav.Link>
          </Nav>
          <Nav>
            {store.isLoggedIn
              ? (
                <NavDropdown title={store.currentUser.email}>
                  {/* <NavDropdown.Item as={Link} to="">Profile</NavDropdown.Item>
                  <NavDropdown.Divider /> */}
                  <NavDropdown.Item
                    as={Link}
                    onClick={handleLogout}
                  >
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              )
              : (
                <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                  <Nav.Link as={NavLink} to="/signup">Sign up</Nav.Link>
                </Nav>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;