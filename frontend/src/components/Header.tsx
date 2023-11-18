import {Container, Nav, Navbar} from "react-bootstrap";
import RegisterCandidates from "./RegisterCandidates";

function Header() {
  return (
      <Navbar expand="md" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Voting</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {/*<Nav.Link href="#link">Link</Nav.Link>*/}
            </Nav>
          </Navbar.Collapse>
          <RegisterCandidates />

          <div className="ms-auto">
            <w3m-button />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2"/>
        </Container>
      </Navbar>
  )
}

export default Header;
