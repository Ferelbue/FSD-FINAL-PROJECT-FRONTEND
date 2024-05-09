
import { BringConversation, BringProductDetail, DealStatus, EraseNotification, Notification, SendMessage, acceptDeal } from "../../services/apiCalls";
import { ChatData2, DataDeal, DataFetched2, MessageData, ProductData2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Conversation.css";
import { useSelector, } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card, Toast } from "react-bootstrap";
import dayjs from "dayjs";
import { productDetailData } from "../../app/slices/productDetailSlice";
import { CInput2 } from "../../common/CInput2/CInput2";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../app/slices/notificationSlice";
import { useNavigate } from "react-router-dom";
import { ROOT2 } from "../../services/apiCalls"

export const Conversation: React.FC = () => {
  const [product, setProducts] = useState<ProductData2>();
  const [statusDeal, setStatusDeal] = useState<DataDeal>();
  const [send, setSend] = useState<boolean>(false);
  const [acceptDe, setAcceptDe] = useState<boolean>(false);
  const [conversation, setConversation] = useState<ChatData2[]>([]);
  const [error, setError] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<boolean>(false);
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<MessageData>({
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
    if (rdxUser.credentials === "") {
      navigate("/home");
    }

  }, [rdxUser]);

  useEffect(() => {
  }, [message]);

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage((prevState: MessageData) => ({
      ...prevState,
      text: e.target.value,
    }));
  };

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched2 = await BringConversation(rdxProductDetail.productDetail.productId, rdxProductDetail.productDetail.userUserId, rdxUser.credentials.token);
      const fetched3: DataFetched2 = await EraseNotification(rdxProductDetail.productDetail.productId, rdxProductDetail.productDetail.userUserId, rdxUser.credentials.token)
      const fetched5: DataFetched2 = await DealStatus(rdxProductDetail.productDetail.productId, rdxProductDetail.productDetail.userUserId, rdxUser.credentials.token);
      setAcceptDe(false)
      setStatusDeal(fetched5.data[0]);
      notiMe();
      console.log(fetched3, "erase")
      const fetched4: DataFetched2 = await Notification(rdxUser.credentials.token);
      if (fetched4.data[0].length === 0 && fetched4.data[1].length === 0) {
        dispatch(updateNotification({ notification: false }));
      } else {
        dispatch(updateNotification({ notification: true }));
      }
      if (fetched.success) {
        setConversation(fetched.data);
        setSend(false);
        setMessage({ text: "" });
      } else {
        setError(fetched.message);
      }
      if (error) {
        console.log(error, "error");
      }
    };
    bringData();
  }, [acceptDe]);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched2 = await BringConversation(rdxProductDetail.productDetail.productId, rdxProductDetail.productDetail.userUserId, rdxUser.credentials.token);
      if (fetched.success) {
        setConversation(fetched.data);
        setSend(false);
        setMessage({ text: "" });
      } else {
        setError(fetched.message);
      }
      if (error) {
        console.log(error, "error");
      }
    };
    bringData();
  }, [send]);



  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched2 = await BringProductDetail(rdxProductDetail.productDetail.productId);
      if (fetched.success) {
        setTimeout(() => {
          setProducts(fetched.data);
        }, 2000);
      }
      notiMe();
    }
    bringData();
  }, [rdxProductDetail]);

  const handleSendMessage = async () => {
    const fetched: DataFetched2 = await SendMessage(rdxProductDetail.productDetail.productId, rdxProductDetail.productDetail.userUserId, rdxUser.credentials.token, message.text);
    setToastMessage(true);
    setSend(true);
    console.log(fetched, "fetched")
  }

  const handleDeal = async (productId: number, userUserId: number) => {
    const fetched5: DataFetched2 = await acceptDeal(productId, userUserId, rdxUser.credentials.token);
    setAcceptDe(true);
    console.log(fetched5, "fetched5")
  }

  const handleReview = async () => {
    navigate('/writeReview')
  }

  return (
    <div className="conversation">
      {conversation && product ? (
        <>
          {toastMessage
            ?
            <div className="toastyAddFavorite">
              <Toast className="custom-toast" onClose={() => setToastMessage(false)} show={toastMessage} delay={2500} autohide>
                <Toast.Body>{"Mensaje enviado correctamente"}</Toast.Body>
              </Toast>
            </div>
            : null
          }
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
              <div className="dealCard3">
                {statusDeal?.userOwner_confirm === true && statusDeal?.userUser_confirm === true
                  ? (product.owner.id !== rdxUser.credentials.user.userId
                    ? <div className="dealFinished" onClick={() => handleReview()}>ESCRIBIR RESEÑA</div>
                    : null
                  )
                  : <div className="dealFinished" onClick={() => handleDeal(product.id, rdxProductDetail.productDetail.userUserId)}>TRATO FINALIZADO</div>
                }
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
                  <div className={message.text.length !== 0 ? "sendMesssage" : "sendMesssage3"} onClick={() => handleSendMessage()}>SEND</div>
                </div>
                <div className="messagesGroup">
                  {[...conversation].reverse().map((convers, index) => (
                    <div key={index}>
                      {convers.userOwner_author === true ? (
                        <Card.Body className="messageConversation1">
                          <div className="messageTitle">
                            <Card.Title className="titleCard">{convers.userOwner.name.toUpperCase()}</Card.Title>
                            <Card.Title className="titleCard2">{dayjs(convers.updated_at).format('YYYY-MM-DD HH:mm')}</Card.Title>
                          </div>

                          <Card.Text className="descriptionCard">{convers.message}</Card.Text>
                        </Card.Body>
                      ) : (
                        <Card.Body className="messageConversation2">
                          <div className="messageTitle">
                            <Card.Title className="titleCard3">{dayjs(convers.updated_at).format('YYYY-MM-DD HH:mm')}</Card.Title>
                            <Card.Title className="titleCard">{convers.userUser.name.toUpperCase()}</Card.Title>
                          </div>
                          <Card.Text className="descriptionCard">{convers.message}</Card.Text>
                        </Card.Body>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </>
      ) :
        <div className="spinnerCenter2">
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      }
    </div>
  );
};
