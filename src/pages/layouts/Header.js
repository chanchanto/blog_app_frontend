import { NavLink, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import authApi from "../../api/authApi";
import useStore from "../../store";

const Header = () => {
  const store = useStore()

  const handleLogout = async () => {
    try {
      store.actions.setIsLoadingRequest(true)

      await authApi.logout()
      
      store.actions.setIsLoggedIn(false)
      store.actions.setIsLoadingRequest(false)

      localStorage.clear()
    } catch (error) {
      store.actions.setIsLoadingRequest(false)
      console.log(error.message)
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          </Nav>
          <Nav>
            {store.isLoggedIn
              ? (
                <NavDropdown title={JSON.parse(localStorage.getItem('currentUser')).email}>
                  <NavDropdown.Item as={Link} to="">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
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