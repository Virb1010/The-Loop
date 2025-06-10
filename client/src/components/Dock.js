import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function Dock() {
    return (
        <Navbar style={{ backgroundColor: '#2f2f2f' }} sticky="top" expand="lg" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/" className="text-white">The Loop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <Nav.Link href="/" className="text-white">Home</Nav.Link>
                    <Nav.Link href="/AboutMe" className="text-white">About Me</Nav.Link>
                    <Nav.Link href="/Links" className="text-white">Links</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Dock;

