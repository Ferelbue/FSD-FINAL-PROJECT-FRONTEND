
import { BringConversation, BringProductDetail, DealStatus, EraseNotification, Notification, SendMessage, acceptDeal } from "../../services/apiCalls";
import { DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Conversation.css";
import { useSelector, } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import { productDetailData } from "../../app/slices/productDetailSlice";
import { CInput2 } from "../../common/CInput2/CInput2";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../app/slices/notificationSlice";
import { useNavigate } from "react-router-dom";
import { ROOT2 } from "../../services/apiCalls"

export const Conversation: React.FC = () => {
  const [product, setProducts] = useState<any>();
  const [statusDeal, setStatusDeal] = useState<any>();
  const [send, setSend] = useState<boolean>(false);
  const [acceptDe, setAcceptDe] = useState<boolean>(false);
  const [conversation, setConversation] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const rdxProductDetail = useSelector(productDetailData);
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

  }, [send, acceptDe]);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched2 = await BringProductDetail(rdxProductDetail.productDetail.productId);
      if (fetched.success) {
        setTimeout(() => {
          setProducts(fetched.data);
        }, 4000);
      }
      notiMe();
    }
    bringData();
  }, [rdxProductDetail]);
  console.log(product, "produasdsaadasdasddadct")
  const handleSendMessage = async () => {

    const fetched: DataFetched2 = await SendMessage(rdxProductDetail.productDetail.productId, rdxProductDetail.productDetail.userUserId, rdxUser.credentials.token, message.text);
    setSend(true);
    console.log(fetched, "fetched")
  }

  const handleDeal = async (productId: number, userUserId: number) => {
    const fetched5: DataFetched2 = await acceptDeal(productId, userUserId, rdxUser.credentials.token);
    setAcceptDe(true);
    console.log(fetched5, "fetched5")
  }

  const handleReview = async () => {
    // const fetched5: DataFetched2 = await productReview(productId,rdxUser.credentials.token);
    navigate('/writeReview')
  }
  console.log(statusDeal, "DEAL");
  console.log(product, "produasdsaadasdasddadct")
  console.log(rdxUser.credentials.user.userId, "product owner");
  return (
    <div className="conversation">
      {conversation && product ? (
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
                  <div className="sendMesssage" onClick={() => handleSendMessage()}>SEND</div>
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
