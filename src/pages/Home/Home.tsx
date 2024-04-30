
import { BringProducts, Notification } from "../../services/apiCalls";
import { DataFetched, DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Home.css";
import { Card, Carousel } from "react-bootstrap";
import { updateNotification } from "../../app/slices/notificationSlice";
import { useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { updateProductDetail } from "../../app/slices/productDetailSlice";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const dispatch = useDispatch();
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();

  const notiMe = async (): Promise<void> => {
    const fetched2: DataFetched2 = await Notification(rdxUser.credentials.token);
    if (fetched2.data[0].length === 0 && fetched2.data[1].length === 0) {
      dispatch(updateNotification({ notification: false }));
    } else {
      dispatch(updateNotification({ notification: true }));
    }
  }
  
  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched = await BringProducts();
      notiMe();
      if (fetched.success) {
        console.log(fetched, "hola soy fetched");
        setFirstFetch(true);

        setProducts(fetched.data);
      } else {
        setError(fetched.message);
      }
    };

    if (!firstFetch) {
      bringData();
    }
  }, [products]);

  const handleDetail = (productId:number,ownerId:number) => {
    console.log(productId, "productId")
    dispatch(updateProductDetail({ productDetail: {productId:productId,userUserId:ownerId}}));
    navigate("/productDetail")
  }

  console.log(products, "products")
  return (
    <div className="home">
      {products.length === 0 ? (
        <div>{error}</div>
      ) : (
        <div>
          {Array.from({ length: 13 }).map((_, i) => {
            const productsOfCategory = products.filter(product => product?.category?.id === i);
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
                                <Card className="cardProduct" onClick={() => handleDetail(product.id,product.owner.id)}>
                                  <Card.Img className="imageProductCard" src={product.image} />
                                  <Card.Body>
                                    <Card.Title className="cardTitle">{product.name.toUpperCase()}</Card.Title>
                                    <div className="cardPrice">
                                      {product.hourPrice}€/hora &nbsp;&nbsp; {product.dayPrice}€/día
                                    </div>
                                    <Card.Text>{product.description}</Card.Text>
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
