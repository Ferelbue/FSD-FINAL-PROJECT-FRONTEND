
import { AddToFavorites, BringFavoriteUserProduct, BringProductDetail, Notification } from "../../services/apiCalls";
import { DataFetched2, FavoriteData, ProductData2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./ProductDetail.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { productDetailData } from "../../app/slices/productDetailSlice";
import { ROOT2 } from "../../services/apiCalls"
import { updateNotification } from "../../app/slices/notificationSlice";
import { useDispatch } from "react-redux";
import { reviewOkData, updateReviewOk } from "../../app/slices/reviewOkSlice";

export const ProductDetail: React.FC = () => {
  const [product, setProducts] = useState<ProductData2>();
  const [favorite, setFavorite] = useState<FavoriteData[]>([]);
  const [addFavorite, setAddFavorite] = useState(false);
  const [addTofavorite, setAddToFavorite] = useState<ProductData2>();
  const [error, setError] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [reviewOk, setReviewOk] = useState<boolean>(false);
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxReviewOk = useSelector(reviewOkData);

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
    const bringData = async () => {
      const fetched: DataFetched2 = await BringProductDetail(rdxProductDetail.productDetail.productId);

      if (fetched.success) {
        setProducts(fetched.data);
      } else {
        setError(fetched.message);
      }
      console.log(error, "error")
    };

    if (!product) {
      bringData();
    }
  }, []);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched2 = await BringProductDetail(rdxProductDetail.productDetail.productId);
      setProducts(fetched.data);
    }
    bringData();
  }, [rdxProductDetail]);

  const handleConversation = async () => {
    if (!rdxUser.credentials) {
      navigate("/login")
    } else {
      navigate("/conversation")
    }
  }

  useEffect(() => {
    const bringData = async () => {
      const fetched2: DataFetched2 = await BringFavoriteUserProduct(rdxProductDetail.productDetail.productId, rdxUser.credentials.token);
      setFavorite(fetched2.data);
    }
    bringData();
  }, [addTofavorite]);

  useEffect(() => {
    if (rdxReviewOk.reviewOk === true) {
      setReviewOk(true)
      setToastMessage("Reseña enviada correctamente")
    }
  }, []);



  const handleAddFavorite = async () => {

    const fetched3: DataFetched2 = await AddToFavorites(rdxProductDetail.productDetail.productId, rdxUser.credentials.token)
    if (fetched3.success) {
      setToastMessage(favorite?.length === 0 ? "Producto añadido a favoritos" : "Producto eliminado de favoritos");
      setAddFavorite(true)
    }
    setAddToFavorite(fetched3.data);

  }

  return (
    <div className="home">
      {product ? (
        <>
          {addFavorite || reviewOk
            ?
            <div className="toastyAddFavorite">
              <Toast className="custom-toast" onClose={() => setAddFavorite(false)} show={addFavorite} delay={2500} autohide>
                <Toast.Body>{toastMessage}</Toast.Body>
              </Toast>
            </div>
            : null
          }

          {reviewOk
            ?
            <div className="toastyAddFavorite">
              <Toast className="custom-toast" onClose={() => { dispatch(updateReviewOk({ reviewOk: false })); setReviewOk(false); }} show={reviewOk} delay={2500} autohide>
                <Toast.Body>{toastMessage}</Toast.Body>
              </Toast>
            </div>
            : null
          }

          <div className="conversationCard">
            <div className="imageConversation" onClick={() => handleConversation()} />
          </div>
          <div className="categoryTitle3">
            {product.name.toUpperCase()}
          </div>
          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct2">
                <div>
                  <Card.Img className="imageProductCard6" src={`${ROOT2}uploads/${product.image}`} />
                  <div className="sendMesssage4" onClick={() => handleAddFavorite()}>
                    {rdxUser.credentials === ""
                      ? null
                      : favorite?.length === 0
                        ? <div className="imageCuore4" title="Add to favorites" />
                        : <div className="imageCuore5" title="Already in favorites" />}
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="cardTitle2">{product.name.toUpperCase()}</Card.Title>
                  <div className="cardPrice2">
                    {product.hourPrice}€/hora &nbsp;&nbsp; {product.dayPrice}€/día &nbsp;&nbsp; {product.depositPrice}€/fianza
                  </div>
                  <Card.Text className="descriptionCard2">{product?.description}</Card.Text>
                </Card.Body>
                <div className="cardCity2">
                  <div className="imageLocation" /> {product.city}
                </div>
                <div className="mapCard2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.9783706774037!2d-0.37939527633656633!3d39.46981734209591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f54c438bba5%3A0xb2eb0eca85a322aa!2sPla%C3%A7a%20de%20l&#39;Ajuntament!5e0!3m2!1ses-419!2ses!4v1714402608949!5m2!1ses-419!2ses"
                    style={{ border: 0, height: '350px', width: '450px', position: 'relative', top: '-125px', left: '-50px' }}
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                <div className="startCard2">
                  <div className="imageChat2" title="My chats" />
                  <div className="nameProductDetail">&nbsp;{product.owner.name} - &nbsp;</div>
                  {product.starts === 0 ? <div className="productStart0"></div> : null}
                  {product.starts === 1 ? <div className="productStart1"></div> : null}
                  {product.starts === 2 ? <div className="productStart2"></div> : null}
                  {product.starts === 3 ? <div className="productStart3"></div> : null}
                  {product.starts === 4 ? <div className="productStart4"></div> : null}
                  {product.starts === 5 ? <div className="productStart5"></div> : null}
                  ({product.reviews.length})
                </div>
                {[...product.reviews].reverse().map((review: any) => (
                  <div className="reviewCard2" key={review.id}>
                    <div className="oneComment">
                      <div className="reviewTitle2">{review.name} <div className="dateDetail">{dayjs(review.updated_at).format('YYYY-MM-DD')}</div></div>
                      <div className="reviewStart2">
                        {review.starts === 0 ? <div className="productStart0"></div> : null}
                        {review.starts === 1 ? <div className="productStart1"></div> : null}
                        {review.starts === 2 ? <div className="productStart2"></div> : null}
                        {review.starts === 3 ? <div className="productStart3"></div> : null}
                        {review.starts === 4 ? <div className="productStart4"></div> : null}
                        {review.starts === 5 ? <div className="productStart5"></div> : null}
                      </div>
                      <div className="reviewText2">{review.description}</div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>

        </>
      ) : (
        <div>Cargando producto...</div>
      )}
    </div>
  );
};
