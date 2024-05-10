
import { BringProducts, Notification } from "../../services/apiCalls";
import { DataFetched, DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Home.css";
import { Card, Carousel, Toast } from "react-bootstrap";
import { updateNotification } from "../../app/slices/notificationSlice";
import { useDispatch } from "react-redux";
import { userData, userout } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { updateProductDetail } from "../../app/slices/productDetailSlice";
import { useNavigate } from "react-router-dom";
import { ROOT2 } from "../../services/apiCalls"
import { updateUploadOk, uploadOkData } from "../../app/slices/uploadOkSlice";
import { searchData3 } from "../../app/slices/search3Slice";

export const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [uploadOk, setUploadOk] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const rdxSearch3 = useSelector(searchData3);
  const rdxUploadOk = useSelector(uploadOkData);


  const notiMe = async (): Promise<void> => {
    const fetched2: DataFetched2 = await Notification(rdxUser.credentials.token);
    console.log(fetched2.message, "fetched2")

    if (fetched2.message === "JWT NOT VALID OR MALFORMED") {
      dispatch(userout({ credentials: "" }));
      dispatch(updateNotification({ notification: "" }));
      navigate("/")
    }

    if (fetched2.data && fetched2.data[0].length === 0 && fetched2.data[1].length === 0) {
      dispatch(updateNotification({ notification: false }));
    } else {
      dispatch(updateNotification({ notification: true }));
    }


  }
  console.log(rdxUploadOk, "rdxUploadOk")
  useEffect(() => {
    if (rdxUploadOk.uploadOk === true) {
      setUploadOk(true)
      dispatch(updateUploadOk({ uploadOk: false }))
    }
  }, []);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched = await BringProducts("","", "", "");
      notiMe();
      if (fetched.success) {
        console.log(fetched, "hola soy fetched");
        setFirstFetch(true);

        setProducts(fetched.data);
      } else {
        setError(fetched.message);
      }
      console.log(error, "error")
    };

    if (!firstFetch) {
      bringData();
    }
  }, [products]);

  useEffect(() => {
    const bringData2 = async () => {
      const fetched: DataFetched = await BringProducts("", rdxSearch3.criteria , "", "");
      setProducts(fetched.data);
    }
    bringData2();
  }, [rdxSearch3.criteria]);

  const handleDetail = (productId: number, ownerId: number) => {
    console.log(productId, "productId")
    dispatch(updateProductDetail({ productDetail: { productId: productId, userUserId: ownerId } }));
    navigate("/productDetail")
  }

  console.log(products, "products")
  return (
    <div className="home">
      {products && products.length === 0 ? (
        <div className="spinnerCenter2">
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      ) : (
        <div>
          <div className="toastyUploadOk">
            <Toast className="custom-toast" onClose={() => setUploadOk(false)} show={uploadOk} delay={2500} autohide>
              <Toast.Body>Producto subido. Mucha suerte!!</Toast.Body>
            </Toast>
          </div>
          {Array.from({ length: 13 }).map((_, i) => {
            const productsOfCategory = products ? products.filter(product => product && product?.category?.id === i) : [];
            const arrayProducts = [];
            const carouselSize = 4;

            for (let j = 0; j < productsOfCategory.length; j += carouselSize) {
              arrayProducts.push(productsOfCategory.slice(j, j + carouselSize));
            }

            return (
              <div key={i}>
                {productsOfCategory[0] &&
                  <>
                    <div className="categoryTitle">
                      {productsOfCategory[0].category.name.toUpperCase()}
                    </div>

                    <Carousel>
                      {arrayProducts.map((block, blockIndex) => (
                        <Carousel.Item key={blockIndex}>
                          <div className="row justify-content-around carouselProducts">
                            {block.map((product) => (
                              <div className="col-sm-12 col-md-6 col-lg-3" key={product.id}>
                                <Card className="cardProduct" onClick={() => handleDetail(product.id, product.owner.id)}>
                                  <Card.Img className="imageProductCard" src={`${ROOT2}uploads/${product.image}`} />
                                  <Card.Body>
                                    <Card.Title className="cardTitle">{product.name.toUpperCase()}</Card.Title>
                                    <div className="cardPrice">
                                      {product.hourPrice}€/hora &nbsp;&nbsp; {product.dayPrice}€/día
                                    </div>
                                    <Card.Text className="cardDescription">{product.description}</Card.Text>
                                  </Card.Body>
                                  <div className="startCard">
                                    {product.starts === 0 ? <div className="productStart0"></div> : null}
                                    {product.starts === 1 ? <div className="productStart1"></div> : null}
                                    {product.starts === 2 ? <div className="productStart2"></div> : null}
                                    {product.starts === 3 ? <div className="productStart3"></div> : null}
                                    {product.starts === 4 ? <div className="productStart4"></div> : null}
                                    {product.starts === 5 ? <div className="productStart5"></div> : null}
                                    ({product.totalReviews})
                                  </div>
                                </Card>
                              </div>
                            ))}
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </>
                }

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
