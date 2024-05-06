
import { BringProductDetail, Notification, productReview } from "../../services/apiCalls";
import { DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./WriteReview.css";
import { useSelector, } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card, Dropdown } from "react-bootstrap";
import dayjs from "dayjs";
import { productDetailData } from "../../app/slices/productDetailSlice";
import { CInput2 } from "../../common/CInput2/CInput2";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../app/slices/notificationSlice";
import { useNavigate } from "react-router-dom";
import { ROOT2 } from "../../services/apiCalls"

export const WriteReview: React.FC = () => {
  const [product, setProducts] = useState<any>();
  const [sendReview, setSendReview] = useState<any>();

  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<any>({
    text: "",
  });
  const [stars, setStars] = useState<any>({
    stars: "",
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
      const fetched: DataFetched2 = await BringProductDetail(rdxProductDetail.productDetail.productId);
      setProducts(fetched.data);
      notiMe();
    }
    bringData();
  }, [rdxProductDetail, stars]);


  const handleSendReview = async () => {
    const fetched5: DataFetched2 = await productReview(rdxProductDetail.productDetail.productId, rdxUser.credentials.token, message.text, stars.stars);
    setSendReview(fetched5.data);
    console.log(fetched5.data)
    console.log(sendReview, "sendReview")
    navigate("/productDetail")

  }

  const handleStar = (star: number) => {
    setStars({ stars: star });
  }


  return (
    <div className="conversation">
      {product ? (
        <>
          <Card className="cardProduct3">
            <Card.Img className="imageProductCard5" src={`${ROOT2}uploads/${product.image}`} />
            <Card.Body>
              <Card.Title className="cardTitle33">
                <div className="cardTitle3">
                  {product.name.toUpperCase()}
                </div>
                <div className="cardTitle34">
                  {product.owner.name} -
                </div>
                <div className="startCard3">
                  {product.starts === 0 ? <div className="productStart0"></div> : null}
                  {product.starts === 1 ? <div className="productStart1"></div> : null}
                  {product.starts === 2 ? <div className="productStart2"></div> : null}
                  {product.starts === 3 ? <div className="productStart3"></div> : null}
                  {product.starts === 4 ? <div className="productStart4"></div> : null}
                  {product.starts === 5 ? <div className="productStart5"></div> : null}
                  ({product.reviews.length})
                </div>
              </Card.Title>
              <div className="cardPrice3">
                <div className="prices">
                  {product.hourPrice}€/hora &nbsp;&nbsp; {product.dayPrice}€/día &nbsp;&nbsp; {product.depositPrice}€/fianza
                </div>
              </div>

            </Card.Body>
          </Card>
          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct6">
                <div className="messageGroup">
                  <CInput2
                    className="inputConversation"
                    placeholder="Escribe un mensaje"
                    name="message"
                    disabled={false}
                    value={message.text || ""}
                    onChange={(e) => inputHandler(e)}
                  />
                  <div className="sendMesssage2">
                    <Dropdown >
                      <Dropdown.Toggle className="dropdownStar">
                        {stars.stars === ""
                          ? "STARS"
                          : (stars.stars)
                        }
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdownStar2">
                        <Dropdown.Item href="#/action-1" onClick={() => handleStar(1)}>1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={() => handleStar(2)}>2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => handleStar(3)}>3</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => handleStar(4)}>4</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => handleStar(5)}>5</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="sendMesssage" onClick={() => handleSendReview()}>SEND</div>
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
