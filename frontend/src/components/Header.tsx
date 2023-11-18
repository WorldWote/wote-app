import { Container, Image, Nav, Navbar } from "react-bootstrap";
import RegisterCandidates from './RegisterCandidates';
import { useAccount } from 'wagmi';

function Header() {
  const { isConnected } = useAccount();
  return (
    <Navbar expand="md" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/images/logo-small.png"  height={28} className="me-2" />
          WorldWote
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/*<Nav.Link href="#link">Link</Nav.Link>*/}
          </Nav>
          {isConnected ? <RegisterCandidates /> : null}

        </Navbar.Collapse>

        <div className="ms-auto">
          <w3m-button />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
      </Container>
    </Navbar>
  );
}

export default Header;
