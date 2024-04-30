
import { BringConversation, BringProductDetail, Notification, SendMessage } from "../../services/apiCalls";
import { DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Conversation.css";
import { useSelector, } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import { productDetailData, updateProductDetail } from "../../app/slices/productDetailSlice";
import { CInput2 } from "../../common/CInput2/CInput2";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../app/slices/notificationSlice";

export const Conversation: React.FC = () => {
  const [product, setProducts] = useState<any>();
  const [send, setSend] = useState<boolean>(false);
  const [conversation, setConversation] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const dispatch = useDispatch();
  const [message, setMessage] = useState<any>({
    text: "",
  });

  useEffect(() => {
    console.log(message, "message");
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

      if (fetched.success) {
        setConversation(fetched.data);
        setSend(false);
        setMessage({ text: "" });
      } else {
        setError(fetched.message);
      }
    };
    bringData();

  }, [send]);

  useEffect(() => {
    const bringData = async () => {
      console.log(rdxProductDetail.productDetail.productId, "rdxProductDetail.productDetail.productId");
      const fetched: DataFetched2 = await BringProductDetail(rdxProductDetail.productDetail.productId);
      setProducts(fetched.data);
    }
    bringData();
  }, [rdxProductDetail]);

  const handleSendMessage = async () => {

      const fetched: DataFetched2 = await SendMessage(rdxProductDetail.productDetail.productId, rdxProductDetail.productDetail.userUserId, rdxUser.credentials.token, message.text);
      console.log(fetched, "fetched");


      setSend(true);
 
  }

  return (
    <div className="conversation">
      {conversation && product ? (
        <>
          <Card className="cardProduct3">
            <Card.Img className="imageProductCard3" src={product.image} />
            <Card.Body>
              <Card.Title className="cardTitle3">{product.name.toUpperCase()}&nbsp;&nbsp; {product.owner.name}</Card.Title>
              <div className="cardPrice3">
                {product.hourPrice}€/hora &nbsp;&nbsp; {product.dayPrice}€/día &nbsp;&nbsp; {product.depositPrice}€/fianza
              </div>

              <div className="startCard3">
                {product.starts === 0 ? <div className="productStart0"></div> : null}
                {product.starts === 1 ? <div className="productStart1"></div> : null}
                {product.starts === 2 ? <div className="productStart2"></div> : null}
                {product.starts === 3 ? <div className="productStart3"></div> : null}
                {product.starts === 4 ? <div className="productStart4"></div> : null}
                {product.starts === 5 ? <div className="productStart5"></div> : null}
                ({product.totalReviews})
              </div>
            </Card.Body>
          </Card>
          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct2">
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

                {conversation.reverse().map((convers, index) => (
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
