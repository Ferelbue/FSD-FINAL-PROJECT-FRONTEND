
import React, { useEffect } from 'react';
import "./Header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

    const datosCredencialesRedux = useSelector(userData);

    //Instancio Redux en modo escritura....
  
    const dispatch = useDispatch();
  
    const navigate = useNavigate();
  
    useEffect(()=>{
      console.log("asdfasdfasdf",datosCredencialesRedux.credentials)
    },[datosCredencialesRedux])




    return (
        <>
            <Navbar expand="lg" className="myNavBar">
                <Container>

                    <Navbar.Brand href="#home">TOOL-RENT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="myNavBar2" />
                    <Form.Control
                        placeholder="Search a product"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <Navbar.Collapse id="basic-navbar-nav" className="myNavBar3">
                        <Nav className="myNavBar1">
                            <Nav.Link href="#home">
                                <div className="imageUser" />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar expand="lg" className="myNavBar0">
                <Container>
                    {/* <img src="../../../public/test.png" alt="Logo" style={{ width: '1em', marginRight: '0.3em' }} /> */}
                    <NavDropdown title="Todas las categorias" id="basic-nav-dropdown" className="my-dropdown">

                        <div className="test">
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div >
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <NavDropdown.Divider />
                        </div>
                        <div className="test">
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div >
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <NavDropdown.Divider />
                        </div>
                        <div className="test">
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div >
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <NavDropdown.Divider />
                        </div>
                        <div className="test">
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div >
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <NavDropdown.Divider />
                        </div>
                        <div className="test">
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div >
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <div className="myNavBar4">
                                <NavDropdown.Item href="#action/2.1">Agricola-Forestal</NavDropdown.Item>
                            </div>
                            <NavDropdown.Divider />
                        </div>
                    </NavDropdown>
                    <Navbar.Collapse id="basic-navbar-nav" className="myNavBar5">
                        <Nav>
                            <Nav.Link className="myNavBar7" href="#home">Bricolaje</Nav.Link>
                            <Nav.Link className="myNavBar7" href="#link">Fontanería</Nav.Link>
                            <Nav.Link className="myNavBar7" href="#link">Construcción</Nav.Link>
                            <Nav.Link className="myNavBar7" href="#link">Agricola-Forestal</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;