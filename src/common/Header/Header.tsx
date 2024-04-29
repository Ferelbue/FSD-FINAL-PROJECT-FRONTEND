
import { useEffect } from 'react';
import "./Header.css"
import { userData, userout } from "../../app/slices/userSlice";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCategory } from '../../app/slices/categorySlice';

const Header = () => {

    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(userout({ credentials: "" }));
        navigate("/")
    };

    const handleCategory = async (category: number) => {
        dispatch(updateCategory({ category: category }));
        navigate("/category")
    };

    return (
        <>
            {(Object.keys(rdxUser?.credentials).length === 0) ? (
                <>
                    <Navbar expand="lg" className="myNavBar">
                        <Container>

                            <Navbar.Brand href="#home" onClick={() => navigate('/home')}>
                                <div className="imageLogo" title="Home" />
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
                                        <div className="imageUser" title="Login" />
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Navbar expand="lg" className="myNavBar0">
                        <Container>
                            <NavDropdown title="Todas las categorias" id="basic-nav-dropdown" className="my-dropdown">

                                <div className="test">
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(1)}>Agricola-Forestal</NavDropdown.Item>
                                    </div >
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(2)}>Construcción</NavDropdown.Item>
                                    </div>
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(3)}>Bricolaje</NavDropdown.Item>
                                    </div>
                                    <NavDropdown.Divider />
                                </div>
                                <div className="test">
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(4)}>Carpintería</NavDropdown.Item>
                                    </div >
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(5)}>Electricidad</NavDropdown.Item>
                                    </div>
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(6)}>Fontanería</NavDropdown.Item>
                                    </div>
                                    <NavDropdown.Divider />
                                </div>
                                <div className="test">
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(7)}>Medición</NavDropdown.Item>
                                    </div >
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(8)}>Jardinería</NavDropdown.Item>
                                    </div>
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(9)}>Limpieza</NavDropdown.Item>
                                    </div>
                                    <NavDropdown.Divider />
                                </div>
                                <div className="test">
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(10)}>Llaves Manuales</NavDropdown.Item>
                                    </div >
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(11)}>Metal</NavDropdown.Item>
                                    </div>
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(12)}>Pintura</NavDropdown.Item>
                                    </div>
                                    <NavDropdown.Divider />
                                </div>
                                <div className="test">
                                    <div className="myNavBar4">
                                        <NavDropdown.Item onClick={() => handleCategory(13)}>Carga-Movimiento</NavDropdown.Item>
                                    </div >
                                    <div className="myNavBar4">
                                        <NavDropdown.Item href="#action/2.1"></NavDropdown.Item>
                                    </div>
                                    <div className="myNavBar4">
                                        <NavDropdown.Item href="#action/2.1"></NavDropdown.Item>
                                    </div>
                                    <NavDropdown.Divider />
                                </div>
                            </NavDropdown>
                            <Navbar.Collapse id="basic-navbar-nav" className="myNavBar5">
                                <Nav>
                                    <Nav.Link className="myNavBar7" onClick={() => handleCategory(3)}>Bricolaje</Nav.Link>
                                    <Nav.Link className="myNavBar7" onClick={() => handleCategory(4)}>Fontanería</Nav.Link>
                                    <Nav.Link className="myNavBar7" onClick={() => handleCategory(2)}>Construcción</Nav.Link>
                                    <Nav.Link className="myNavBar7" onClick={() => handleCategory(1)}>Agricola-Forestal</Nav.Link>
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
                                        <div className="imageLogo" title="Home" />
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
                                                <div className="imagePlus" title="Upload product" />
                                            </Nav.Link>
                                            <Nav.Link href="#home">
                                                <div className="imageCuore" title="My favorites" />
                                            </Nav.Link>
                                            <Nav.Link href="#home">
                                                <div className="imageChat" title="My chats" onClick={() => navigate('/chats')}/>
                                            </Nav.Link>
                                            <Nav.Link href="#home">
                                                <div className="imageUser" title="My profile" />
                                            </Nav.Link>
                                            <Nav.Link href="#home" onClick={() => handleLogout()}>
                                                <div className="imageExit" title="Log Out" />
                                            </Nav.Link>

                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <Navbar expand="lg" className="myNavBar0">
                                <Container>
                                    <NavDropdown title="Todas las categorias" id="basic-nav-dropdown" className="my-dropdown">

                                        <div className="test">
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(1)}>Agricola-Forestal</NavDropdown.Item>
                                            </div >
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(2)}>Construcción</NavDropdown.Item>
                                            </div>
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(3)}>Bricolaje</NavDropdown.Item>
                                            </div>
                                            <NavDropdown.Divider />
                                        </div>
                                        <div className="test">
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(4)}>Carpintería</NavDropdown.Item>
                                            </div >
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(5)}>Electricidad</NavDropdown.Item>
                                            </div>
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(6)}>Fontanería</NavDropdown.Item>
                                            </div>
                                            <NavDropdown.Divider />
                                        </div>
                                        <div className="test">
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(7)}>Medición</NavDropdown.Item>
                                            </div >
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(8)}>Jardinería</NavDropdown.Item>
                                            </div>
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(9)}>Limpieza</NavDropdown.Item>
                                            </div>
                                            <NavDropdown.Divider />
                                        </div>
                                        <div className="test">
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(10)}>Llaves Manuales</NavDropdown.Item>
                                            </div >
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(11)}>Metal</NavDropdown.Item>
                                            </div>
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(12)}>Pintura</NavDropdown.Item>
                                            </div>
                                            <NavDropdown.Divider />
                                        </div>
                                        <div className="test">
                                            <div className="myNavBar4">
                                                <NavDropdown.Item onClick={() => handleCategory(13)}>Carga-Movimiento</NavDropdown.Item>
                                            </div >
                                            <div className="myNavBar4">
                                                <NavDropdown.Item href="#action/2.1"></NavDropdown.Item>
                                            </div>
                                            <div className="myNavBar4">
                                                <NavDropdown.Item href="#action/2.1"></NavDropdown.Item>
                                            </div>
                                            <NavDropdown.Divider />
                                        </div>
                                    </NavDropdown>
                                    <Navbar.Collapse id="basic-navbar-nav" className="myNavBar5">
                                        <Nav>
                                            <Nav.Link className="myNavBar7" onClick={() => handleCategory(3)}>Bricolaje</Nav.Link>
                                            <Nav.Link className="myNavBar7" onClick={() => handleCategory(4)}>Fontanería</Nav.Link>
                                            <Nav.Link className="myNavBar7" onClick={() => handleCategory(2)}>Construcción</Nav.Link>
                                            <Nav.Link className="myNavBar7" onClick={() => handleCategory(1)}>Agricola-Forestal</Nav.Link>
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

                                        <Navbar.Brand href="#home" onClick={() => navigate('/home')}>
                                            <div className="imageLogo" title="Home" />
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
                                                    <div className="imagePlus" title="Upload product" />
                                                </Nav.Link>
                                                <Nav.Link href="#home">
                                                    <div className="imageCuore" title="My favorites" />
                                                </Nav.Link>
                                                <Nav.Link href="#home">
                                                    <div className="imageChat" title="My chats" onClick={() => navigate('/chats')}/>
                                                </Nav.Link>
                                                <Nav.Link href="#home">
                                                    <div className="imageUser" title="My profile" />
                                                </Nav.Link>
                                                <Nav.Link href="#home" onClick={() => handleLogout()}>
                                                    <div className="imageExit" title="Log Out" />
                                                </Nav.Link>

                                            </Nav>
                                        </Navbar.Collapse>
                                    </Container>
                                </Navbar>
                                <Navbar expand="lg" className="myNavBar0">
                                    <Container>
                                        <NavDropdown title="Todas las categorias" id="basic-nav-dropdown" className="my-dropdown">

                                            <div className="test">
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(1)}>Agricola-Forestal</NavDropdown.Item>
                                                </div >
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(2)}>Construcción</NavDropdown.Item>
                                                </div>
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(3)}>Bricolaje</NavDropdown.Item>
                                                </div>
                                                <NavDropdown.Divider />
                                            </div>
                                            <div className="test">
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(4)}>Carpintería</NavDropdown.Item>
                                                </div >
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(5)}>Electricidad</NavDropdown.Item>
                                                </div>
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(6)}>Fontanería</NavDropdown.Item>
                                                </div>
                                                <NavDropdown.Divider />
                                            </div>
                                            <div className="test">
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(7)}>Medición</NavDropdown.Item>
                                                </div >
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(8)}>Jardinería</NavDropdown.Item>
                                                </div>
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(9)}>Limpieza</NavDropdown.Item>
                                                </div>
                                                <NavDropdown.Divider />
                                            </div>
                                            <div className="test">
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(10)}>Llaves Manuales</NavDropdown.Item>
                                                </div >
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(11)}>Metal</NavDropdown.Item>
                                                </div>
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(12)}>Pintura</NavDropdown.Item>
                                                </div>
                                                <NavDropdown.Divider />
                                            </div>
                                            <div className="test">
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item onClick={() => handleCategory(13)}>Carga-Movimiento</NavDropdown.Item>
                                                </div >
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item href="#action/2.1"></NavDropdown.Item>
                                                </div>
                                                <div className="myNavBar4">
                                                    <NavDropdown.Item href="#action/2.1"></NavDropdown.Item>
                                                </div>
                                                <NavDropdown.Divider />
                                            </div>
                                        </NavDropdown>
                                        <Navbar.Collapse id="basic-navbar-nav" className="myNavBar5">
                                            <Nav>
                                                <Nav.Link className="myNavBar7" onClick={() => handleCategory(3)}>Bricolaje</Nav.Link>
                                                <Nav.Link className="myNavBar7" onClick={() => handleCategory(4)}>Fontanería</Nav.Link>
                                                <Nav.Link className="myNavBar7" onClick={() => handleCategory(2)}>Construcción</Nav.Link>
                                                <Nav.Link className="myNavBar7" onClick={() => handleCategory(1)}>Agricola-Forestal</Nav.Link>
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