
import { useEffect } from 'react';
import "./Header.css"
import { userData , userout } from "../../app/slices/userSlice";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {

    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("asdfasdfasdf", rdxUser.credentials)
    }, [rdxUser])

    const handleLogout = async () => {
        dispatch(userout({ credentials: "" }));
        navigate("/")
      };

    console.log("rdxUser", rdxUser.credentials)

    return (
        <>
            {(Object.keys(rdxUser?.credentials).length === 0) ? (
                <>
                    <Navbar expand="lg" className="myNavBar">
                        <Container>

                            <Navbar.Brand href="#home" onClick={() => navigate('/home')}>
                                <div className="imageLogo" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" className="myNavBar2" />
                            <Form.Control
                                placeholder="Search a product"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                            <Navbar.Collapse id="basic-navbar-nav" className="myNavBar3">
                                <Nav className="myNavBar1">
                                    <Nav.Link href="#home" onClick={() => navigate('/login')}>
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
            ) : (
                rdxUser?.credentials && (
                    rdxUser?.credentials?.user?.roleName === "user" ? (
                        <>
                            <Navbar expand="lg" className="myNavBar">
                                <Container>

                                    <Navbar.Brand href="#home" onClick={() => navigate('/home')}>
                                        <div className="imageLogo" />
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="myNavBar2" />
                                    <Form.Control
                                        placeholder="Search a product"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                    <Navbar.Collapse id="basic-navbar-nav" className="myNavBar3">
                                        <Nav className="myNavBar1">
                                            <Nav.Link href="#home">
                                                <div className="imagePlus" />
                                            </Nav.Link>
                                            <Nav.Link href="#home">
                                                <div className="imageCuore" />
                                            </Nav.Link>
                                            <Nav.Link href="#home">
                                                <div className="imageChat" />
                                            </Nav.Link>
                                            <Nav.Link href="#home">
                                                <div className="imageUser" />
                                            </Nav.Link>
                                            <Nav.Link href="#home" onClick={()=> handleLogout()}>
                                                <div className="imageExit" />
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
                    ) : (
                        (rdxUser?.credentials?.user?.roleName === "admin" || rdxUser?.credentials?.user?.roleName === "super-admin") && (
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
                                                <Nav.Link href="#home">
                                                    hola
                                                    {/* <div className="imageUser" /> */}
                                                </Nav.Link>
                                                <Nav.Link href="#home">
                                                    adios
                                                    {/* <div className="imageUser" /> */}
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
                    )
                )
            )}
        </>
    )
}

export default Header;