
import { FavoriteProducts, Notification } from "../../services/apiCalls";
import { DataFetched, DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Favorites.css";
import { categoryData } from "../../app/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import { updateProductDetail } from "../../app/slices/productDetailSlice";
import { useNavigate } from "react-router-dom";
import { updateNotification } from "../../app/slices/notificationSlice";
import { ROOT2 } from "../../services/apiCalls"

export const Favorites: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [showNoFavorites, setShowNoFavorites] = useState(false);
  const dispatch = useDispatch();
  const rdxCategory = useSelector(categoryData);
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
  notiMe();

  useEffect(() => {
    if (!products) {
      setTimeout(() => {
        setShowNoFavorites(true);
      }, 1500);

    }
  }, [products]);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched = await FavoriteProducts(rdxUser.credentials.token);

      if (fetched.success) {
        setProducts(fetched.data);
        console.log(fetched, "hola soy fetched");
      } else {
        setError(fetched.message);
      }
      console.log(error, "error")
    };

    if (products && !products.length) {
      bringData();
    }

  }, [products, rdxCategory]);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched = await FavoriteProducts(rdxUser.credentials.token);
      setProducts(fetched.data);
    }
    bringData();
  }, [rdxCategory]);

  const handleDetail = (productId: number) => {
    console.log(productId, "productId")
    dispatch(updateProductDetail({ productDetail: { productId: productId } }));
    navigate("/productDetail")
  }

  console.log(products, "products")

  return (
    <div className="category">
      <div className="categoryTitle2">
        MY FAVORITES
      </div>
      {products && products.length > 0 ? (
        <>
          <div className="row justify-content-around categoryProducts">
            {products.map((product) => (
              <div className="col-sm-12 col-md-6 col-lg-3" key={product.id}>
                <Card className="cardProduct" onClick={() => handleDetail(product.product.id)}>
                  <Card.Img className="imageProductCard" src={`${ROOT2}uploads/${product.product.image}`} />
                  <Card.Body>
                    <Card.Title className="cardTitle">{product.product.name ? product.product.name.toUpperCase() : ''}</Card.Title>
                    <div className="cardPrice">
                      {product.product.hourPrice}€/hora &nbsp;&nbsp; {product.product.dayPrice}€/día
                    </div>
                    <Card.Text>{product.product.description}</Card.Text>
                  </Card.Body>
                  <div className="startCard">
                    {product.product.starts === 0 ? <div className="productStart0"></div> : null}
                    {product.product.starts === 1 ? <div className="productStart1"></div> : null}
                    {product.product.starts === 2 ? <div className="productStart2"></div> : null}
                    {product.product.starts === 3 ? <div className="productStart3"></div> : null}
                    {product.product.starts === 4 ? <div className="productStart4"></div> : null}
                    {product.product.starts === 5 ? <div className="productStart5"></div> : null}
                    ({product.product.totalReviews})
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) :
        showNoFavorites
          ?
          (
            <div className="spinnerCenter2">No tienes productos favoritos</div>
          )
          :
          (
            <div className="spinnerCenter2">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )

      }
    </div>
  );
};
