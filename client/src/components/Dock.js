import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from "react-router-dom";

function Dock() {
  const { user, logout } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Navigate("/Welcome");
  };

  const fullName = user ? `${user.firstName} ${user.lastName}` : null;
  const isGuest = user?.isGuest;

  return (
    <Navbar style={{ backgroundColor: '#2f2f2f' }} sticky="top" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="text-white">The Loop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/AboutMe" className="text-white">About Me</Nav.Link>
            <Nav.Link href="/Links" className="text-white">Links</Nav.Link>

            {!user && (
              <Nav.Link className="text-white" onClick={() => Navigate('/Welcome')}>
                Sign In
              </Nav.Link>
            )}

            {user && isGuest && (
              <Nav.Link
                onClick={() => Navigate('/Welcome')}
                style={{
                  backgroundColor: '#f3efe9',
                  color: '#2f2f2f',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  marginLeft: '12px',
                  transition: 'background-color 0.3s, color 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e6e2db';
                  e.target.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f3efe9';
                  e.target.style.color = '#2f2f2f';
                }}
              >
                Sign In
              </Nav.Link>
            )}


            {user && !isGuest && (
              <NavDropdown
                title={<span style={{ color: '#f3efe9' }}>{fullName}</span>}
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item onClick={() => Navigate(`/CreatePost`)}>Create Post</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Dock;
