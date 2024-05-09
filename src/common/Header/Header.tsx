
import { useEffect, useState } from 'react';
import "./Header.css"
import { userData, userout } from "../../app/slices/userSlice";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCategory } from '../../app/slices/categorySlice';
import { notificationData, updateNotification } from '../../app/slices/notificationSlice';
import { DataFetched2, ProductData } from '../../interfaces';
import { BringProducts, Notification } from '../../services/apiCalls';
import { searchData, updateCriteria } from '../../app/slices/searchSlice';
import { CustomInput } from '../CustomInput/CustomInput';
import { updateProductDetail } from '../../app/slices/productDetailSlice';
import { Spinner } from 'react-bootstrap';

const Header = () => {

    const rdxUser = useSelector(userData);
    const rdxNotification = useSelector(notificationData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [criteria, setCriteria] = useState("")
    const [nameCriteria, setNameCriteria] = useState("")
    const [productsFetched, setProductsFetched] = useState<any>();
    const searchRdx = useSelector(searchData);

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        setIsLoading(true)
    }, [rdxUser]);

    useEffect(() => {
        const bringUsers = async () => {
            if (searchRdx.criteria !== "") {
                try {
                    const fetchedData: DataFetched2 = await BringProducts(searchRdx.criteria, "", "");

                    setProductsFetched(fetchedData);
                    console.log(fetchedData, "fetchedData")
                } catch (error) {
                    setError(productsFetched.message);
                }
                console.log(error, "error")
            } else (
                setProductsFetched("")
            )
        };

        bringUsers();
    }, [searchRdx.criteria]);

    useEffect(() => {
        const searching = setTimeout(() => {
            dispatch(updateCriteria(nameCriteria));
        }, 375);

        return () => clearTimeout(searching);
    }, [criteria]);


    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCriteria(e.target.value)
        setNameCriteria(e.target.value.toLowerCase())
    }

    const notiMe = async (): Promise<void> => {
        const fetched2: DataFetched2 = await Notification(rdxUser.credentials.token);
        if (fetched2.data[0].length === 0 && fetched2.data[1].length === 0) {
            dispatch(updateNotification({ notification: false }));
        } else {
            dispatch(updateNotification({ notification: true }));
        }
    }

    const handleLogout = async () => {
        dispatch(userout({ credentials: "" }));
        dispatch(updateNotification({ notification: "" }));
        navigate("/")
    };

    const handleCategory = async (category: number) => {
        dispatch(updateCategory({ category: category }));
        navigate("/category")
        notiMe();
    };

    const handleDetail = (productId: number, ownerId: number) => {
        console.log(productId, "productId")
        dispatch(updateProductDetail({ productDetail: { productId: productId, userUserId: ownerId } }));
        setCriteria("")
        setNameCriteria("")
        navigate("/productDetail")
    }

    return (
        <div className='header'>
            {isLoading ? (
                <div className="myNavBar6">
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                </div>
            ) : (
                (Object.keys(rdxUser?.credentials).length === 0) ? (
                    <>
                        <div className="myNavBar">
                            <div className="myNavBar5">
                                <div className='logoSearch'>
                                    <div className='logoNav'>
                                        <div onClick={() => navigate('/home')}>
                                            <div className="imageLogo" title="Home" />
                                        </div>
                                    </div>
                                    <div className="searchField">
                                        <div className="inputHeader">
                                            <CustomInput
                                                className={`inputSearch`}
                                                type="text"
                                                placeholder="search a product...."
                                                name="user"
                                                disabled={false}
                                                value={criteria || ""}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchHandler(e)}
                                            />
                                        </div>
                                        <div className='searchOptions'>
                                            {productsFetched?.success && productsFetched?.data?.length > 0 ? (
                                                <div className="searchUsers">
                                                    {productsFetched.data.slice(0, 5).map((product: ProductData) => {
                                                        return (
                                                            <div className="userSearched4" key={product.id}>
                                                                <div className="test3" onClick={() => handleDetail(product.id, product.owner.id)}>
                                                                    {product.name.toUpperCase()}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                    </div>
                                    <div className="logoNoUser">
                                        <>
                                            {(rdxUser?.credentials).length === 0
                                                ? (
                                                    <div className="imageUser" title="Login" onClick={() => navigate('/login')} />
                                                ) : (
                                                    null
                                                )}
                                        </>
                                    </div>
                                </div>
                                <div>
                                    <div className="myNavBar3">
                                        {(rdxUser?.credentials).length === 0
                                            ? (
                                                null
                                            ) : (
                                                <>
                                                    <div className="imagePlus" title="Upload product" onClick={() => navigate('/uploadProduct')} />
                                                    <div className="imageCuore" title="My favorites" onClick={() => navigate('/favorites')} />
                                                    {(rdxNotification.notification === true)
                                                        ? (
                                                            <div className="imageChatNot" title="My chats" onClick={() => navigate('/chats')} />
                                                        ) : (
                                                            <div className="imageChat" title="My chats" onClick={() => navigate('/chats')} />
                                                        )
                                                    }
                                                    <div className="imageUser" title="My profile" onClick={() => navigate('/profile')} />
                                                    <div className="imageExit" title="Log Out" onClick={() => handleLogout()} />
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        <Nav.Link className="myNavBar7" onClick={() => handleCategory(4)}>Carpintería</Nav.Link>
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
                                <div className="myNavBar">
                                    <div className="myNavBar5">
                                        <div className='logoSearch'>
                                            <div className='logoNav'>
                                                <div onClick={() => navigate('/home')}>
                                                    <div className="imageLogo" title="Home" />
                                                </div>
                                            </div>
                                            <div className="searchField">
                                                <div className="inputHeader">
                                                    <CustomInput
                                                        className={`inputSearch`}
                                                        type="text"
                                                        placeholder="search a product...."
                                                        name="user"
                                                        disabled={false}
                                                        value={criteria || ""}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchHandler(e)}
                                                    />
                                                </div>
                                                <div className='searchOptions'>
                                                    {productsFetched?.success && productsFetched?.data?.length > 0 ? (
                                                        <div className="searchUsers">
                                                            {productsFetched.data.slice(0, 5).map((product: ProductData) => {
                                                                return (
                                                                    <div className="userSearched4" key={product.id}>
                                                                        <div className="test3" onClick={() => handleDetail(product.id, product.owner.id)}>
                                                                            {product.name.toUpperCase()}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        null
                                                    )}
                                                </div>
                                            </div>
                                            <div className="logoNoUser">
                                                <>
                                                    {(rdxUser?.credentials).length === 0
                                                        ? (
                                                            <div className="imageUser" title="Login" onClick={() => navigate('/login')} />
                                                        ) : (
                                                            null
                                                        )}
                                                </>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="myNavBar3">
                                                {(rdxUser?.credentials).length === 0
                                                    ? (
                                                        null
                                                    ) : (
                                                        <>
                                                            <div className="imagePlus" title="Upload product" onClick={() => navigate('/uploadProduct')} />
                                                            <div className="imageCuore" title="My favorites" onClick={() => navigate('/favorites')} />
                                                            {(rdxNotification.notification === true)
                                                                ? (
                                                                    <div className="imageChatNot" title="My chats" onClick={() => navigate('/chats')} />
                                                                ) : (
                                                                    <div className="imageChat" title="My chats" onClick={() => navigate('/chats')} />
                                                                )
                                                            }
                                                            <div className="imageUser" title="My profile" onClick={() => navigate('/profile')} />
                                                            <div className="imageExit" title="Log Out" onClick={() => handleLogout()} />
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    <div className="myNavBar">
                                        <div className="myNavBar5">
                                            <div className='logoSearch'>
                                                <div className='logoNav'>
                                                    <div onClick={() => navigate('/home')}>
                                                        <div className="imageLogo" title="Home" />
                                                    </div>
                                                </div>
                                                <div className="searchField">
                                                    <div className="inputHeader">
                                                        <CustomInput
                                                            className={`inputSearch`}
                                                            type="text"
                                                            placeholder="search a product...."
                                                            name="user"
                                                            disabled={false}
                                                            value={criteria || ""}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchHandler(e)}
                                                        />
                                                    </div>
                                                    <div className='searchOptions'>
                                                        {productsFetched?.success && productsFetched?.data?.length > 0 ? (
                                                            <div className="searchUsers">
                                                                {productsFetched.data.slice(0, 5).map((product: ProductData) => {
                                                                    return (
                                                                        <div className="userSearched4" key={product.id}>
                                                                            <div className="test3" onClick={() => handleDetail(product.id, product.owner.id)}>
                                                                                {product.name.toUpperCase()}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        ) : (
                                                            null
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="logoNoUser">
                                                    <>
                                                        {(rdxUser?.credentials).length === 0
                                                            ? (
                                                                <div className="imageUser" title="Login" onClick={() => navigate('/login')} />
                                                            ) : (
                                                                null
                                                            )}
                                                    </>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="myNavBar3">
                                                    {(rdxUser?.credentials).length === 0
                                                        ? (
                                                            null
                                                        ) : (
                                                            <>
                                                                <div className="imagePlus" title="Upload product" onClick={() => navigate('/uploadProduct')} />
                                                                <div className="imageCuore" title="My favorites" onClick={() => navigate('/favorites')} />
                                                                {(rdxNotification.notification === true)
                                                                    ? (
                                                                        <div className="imageChatNot" title="My chats" onClick={() => navigate('/chats')} />
                                                                    ) : (
                                                                        <div className="imageChat" title="My chats" onClick={() => navigate('/chats')} />
                                                                    )
                                                                }
                                                                <div className="imageUser" title="My profile" onClick={() => navigate('/profile')} />
                                                                <div className="imageExit" title="Log Out" onClick={() => handleLogout()} />
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                )
            )}
        </div>
    )

}

export default Header;