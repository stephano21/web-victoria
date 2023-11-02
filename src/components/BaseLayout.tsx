import React, { ReactNode, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
//Auth
import { useAuth } from "./../context/AuthContext";
interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = (
  props: BaseLayoutProps
) => {
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
          <Navbar.Brand onClick={handleShow}>
            <i
              className="bi bi-list"
              style={{ fontSize: "2rem", color: "black" }}
            ></i>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="#action5"
                  onClick={() => {
                    logout();
                    handleLinkClick();
                  }}
                >
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>

            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Plant Trace</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header><i className="bi bi-cloud-lightning-rain"></i> &nbsp; Clima</Accordion.Header>
                    <Accordion.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Nav.Link href="/catalogos/plantas"><i className="bi bi-arrow-repeat"></i>&nbsp;&nbsp;Sincronizaciones</Nav.Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Nav.Link href="/catalogos/lotes"><i className="bi bi-map-fill"></i>&nbsp;&nbsp;Lotes</Nav.Link>
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header><i className="bi bi-signpost-2"></i> &nbsp;Cultivo</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Nav.Link href="/catalogos/plantas"><i className="bi bi-tree-fill"></i>&nbsp;&nbsp;Plantas</Nav.Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Nav.Link href="/catalogos/lotes"><i className="bi bi-map-fill"></i>&nbsp;&nbsp;Lotes</Nav.Link>
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header><i className="bi bi-graph-up-arrow"></i> &nbsp;Estimaciones</Accordion.Header>
                    <Accordion.Body>
                    <ListGroup variant="flush">
                    <ListGroup.Item>
                          <Nav.Link href="/catalogos/plantas"><i className="bi bi-bar-chart-fill"></i>&nbsp;&nbsp;Estadisticas</Nav.Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Nav.Link href="/catalogos/plantas"><i className="bi bi-graph-up"></i>&nbsp;&nbsp;Estimaciones</Nav.Link>
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header><i className="bi bi-person-gear"></i> &nbsp;Administrador</Accordion.Header>
                    <Accordion.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Nav.Link href="/catalogos/plantas"><i className="bi bi-people-fill"></i>&nbsp;&nbsp;Usuarios</Nav.Link>
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Offcanvas.Body>
            </Offcanvas>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{children}</main>
    </>
  );
};
