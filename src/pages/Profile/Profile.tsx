
import { BringConversation, BringProductDetail, BringUserProducts, BringUserProfile, DealStatus, EraseNotification, Notification, SendMessage, acceptDeal } from "../../services/apiCalls";
import { DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Profile.css";
import { useSelector, } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card, Carousel } from "react-bootstrap";
import dayjs from "dayjs";
import { productDetailData, updateProductDetail } from "../../app/slices/productDetailSlice";
import { CInput2 } from "../../common/CInput2/CInput2";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../app/slices/notificationSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { ROOT2 } from "../../services/apiCalls"

export const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>();
  const [userProducts, setUserProducts] = useState<any>();
  const [error, setError] = useState<string>("");
  const rdxProductDetail = useSelector(productDetailData);
  const [uploadProductsClick, setUploadProductsClick] = useState<boolean>(false);
  const [myReviewsClick, setMyReviewsClick] = useState<boolean>(false);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<any>({
    text: "",
  });


  const notiMe = async (): Promise<void> => {
    const fetched2: DataFetched2 = await Notification(rdxUser.credentials.token);
    if (fetched2.data[0].length === 0 && fetched2.data[1].length === 0) {
      dispatch(updateNotification({ notification: false }));
    } else {
      dispatch(updateNotification({ notification: true }));
    }
  }

  useEffect(() => {
  }, [message]);

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage((prevState: any) => ({
      ...prevState,
      text: e.target.value,
    }));
  };

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched2 = await BringUserProfile(rdxUser.credentials.token);
      const fetched2: DataFetched2 = await BringUserProducts(rdxUser.credentials.token);
      setUserProfile(fetched.data[0]);
      setUserProducts(fetched2.data);
      console.log(fetched.data[0], "fetchedadasdasdasdasdassdasds.data");

      notiMe();
      if (error) {
        console.log(error, "error");
      }
    };
    bringData();

  }, []);

  const handleDetail = (productId: number, ownerId: number) => {
    console.log(productId, "productId")
    dispatch(updateProductDetail({ productDetail: { productId: productId, userUserId: ownerId } }));
    navigate("/productDetail")
  }

  const handleUploadProducts = () => {
    setUploadProductsClick(true);
    setMyReviewsClick(false);
  }
  const handleMyReviews = () => {
    setMyReviewsClick(true);
    setUploadProductsClick(false);
  }



  const carouselSize = 4;
  const arrayProducts = [];
  if (userProfile && userProducts) {
    for (let i = 0; i < userProducts.length; i += carouselSize) {
      arrayProducts.push(userProducts.slice(i, i + carouselSize));
    }
  }


  console.log(userProfile, "userProfile")

  return (
    <div className="profile">

      <>
        <div className="categoryTitle31">
          <div>
            MY PROFILE
          </div>
          <div className="iconsProfile">
            <div className="imageCloud" title="Upload product" onClick={() => handleUploadProducts()} />
            <div className="imageReviews" title="My favorites" onClick={() => handleMyReviews()} />
            <div className="imageSettings" title="My favorites" onClick={() => navigate('/favorites')} />
          </div>
        </div>
        <>
          {userProfile ? (
            <Card className="cardProduct33">

              <div className="imageGroupProfile" >
                <Card.Img className="imageUserProfile" src={userProfile.image} />
                <div>TOTAL PRESTADOS ({userProfile.reviews.length})</div>
                <div>TOTAL SUBIDOS ({userProducts.length})</div>
              </div>
              <div className="imageGroupProfile2" >
                <div>{userProfile.name.toUpperCase()}</div>
                <div>{userProfile.lastName.toUpperCase()}</div>
                <div>{userProfile.city}</div>
              </div>
            </Card>

          ) : (
            <Card className="cardProduct31">
              <div>Cargando producto...</div>
            </Card>
          )}
        </>

        <div>
          {uploadProductsClick && (
            <>
              <div className="categoryTitle35">
                MY UPLOAD PRODUCTS
              </div>

              <Carousel>
                {arrayProducts && arrayProducts.map((products: any, productIndex: number) => (
                  <Carousel.Item key={productIndex}>
                    <div className="row justify-content-around carouselProducts3">
                      {products.map((product: any) => (
                        <div className="col-sm-12 col-md-6 col-lg-3" key={product.id}>
                          <Card className="cardProduct" onClick={() => handleDetail(product.id, product.owner.id)}>
                            <Card.Img className="imageProductCard" src={`${ROOT2}uploads/${product.image}`} />
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
          )}
        </div>


        <div>
          {myReviewsClick && (
            <>
              <div className="categoryTitle35">
                MY REVIEWS
              </div>
              <Card className="cardMyReviews">
                <div>
                  <div >
                    {[...userProfile.reviews].reverse().map((review: any) => (
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
                  </div>
                </div>
              </Card>

            </>
          )}
        </div>



      </>

    </div >
  );
};
