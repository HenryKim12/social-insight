import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { CiSearch } from "react-icons/ci";

function NavigationBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" className="brand">Newsstand</Navbar.Brand>
        <div class="vr"></div>
        <Navbar.Collapse id="navbarScroll" className="nav-collapse">
          <Nav className="nav" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link className="nav-link" onClick={() => navigate("/")}>
              News
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate("/sports")}>
              Sport
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate("/travel")}>
              Travel
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate("/fashion")}>
              Fashion
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate("/food")}>
              Food
            </Nav.Link>
            <Nav.Link
              className="nav-link"
              onClick={() => navigate("/entertainment")}
            >
              Entertainment
            </Nav.Link>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action7">Favourites</NavDropdown.Item>
              <NavDropdown.Item href="#action8">???</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="search-buttons">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="light">
                <CiSearch />
              </Button>
            </Form>
            <div className="user-buttons">
              <Button variant="light" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="dark" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;