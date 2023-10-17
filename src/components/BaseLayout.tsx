import React, { ReactNode, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
//Auth
import { useAuth } from "./../context/AuthContext";
interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = (props: BaseLayoutProps) => {
  const { children } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLinkClick = () => setShow(true);
  const { logout } = useAuth();
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand onClick={handleShow}><i className="bi bi-list" style={{fontSize: "2rem", color: "black"}}></i></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1" >Home</Nav.Link>
              <Nav.Link href="#action2" >Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3" >Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4" >
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5" onClick={() => {logout(); handleLinkClick()}}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
              </Offcanvas.Body>
            </Offcanvas>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{children}</main>
    </>
  );
}

