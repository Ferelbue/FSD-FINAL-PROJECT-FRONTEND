
import { BringAllChats, BringConversation, BringProductDetail, Notification, SendMessage } from "../../services/apiCalls";
import { DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Chats.css";
import { useSelector, } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import { productDetailData, updateProductDetail } from "../../app/slices/productDetailSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../app/slices/notificationSlice";

export const Chats: React.FC = () => {
  const [chats, setChats] = useState<any>();
  const [error, setError] = useState<string>("");
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const fetched: DataFetched2 = await BringAllChats(rdxUser.credentials.token);
      setChats(fetched.data);
    }
    bringData();
  }, [rdxProductDetail]);

  const handleConversation = async (productId: number, userUserId: number) => {
    dispatch(updateProductDetail({ productDetail: { productId: productId, userUserId: userUserId } }));
    navigate('/conversation')
  }
  let mappedProductIds = new Set();
  let mappedUserIds = new Set();
  console.log(chats, "chats");
  return (
    <div className="chats">
      {chats ? (
        <>
          <div>
            <div className="categoryTitle4"> MY CHATS </div>
            <div className="mx-auto">
              <Card className="cardProduct4">
                {chats.map((chat: any, index: number) => {
                  if (chat.userOwner.id === rdxUser.credentials.user.userId) {
                    if (!mappedUserIds.has(chat.userUser.id)) {
                      // mappedProductIds.add(chat.product.id);
                      mappedUserIds.add(chat.userUser.id);
                      return (
                        <Card key={index} className="cardProduct3" onClick={() => handleConversation(chat.product.id, chat.userUser.id)}>
                          <Card.Text>VENDO</Card.Text>
                          <Card.Img className="imageProductCard3" src={chat.product.image} />
                          <Card.Body>
                            <Card.Title className="cardTitle3">{chat.product.name.toUpperCase()}&nbsp;&nbsp;{chat.userUser.name.toUpperCase()}</Card.Title>
                            <div className="cardPrice3">
                              {chat.product.hourPrice}€/hora &nbsp;&nbsp; {chat.product.dayPrice}€/día &nbsp;&nbsp; {chat.product.depositPrice}€/fianza
                            </div>

                            <div className="startCard3">
                              {chat.product.starts === 0 ? <div className="productStart0"></div> : null}
                              {chat.product.starts === 1 ? <div className="productStart1"></div> : null}
                              {chat.product.starts === 2 ? <div className="productStart2"></div> : null}
                              {chat.product.starts === 3 ? <div className="productStart3"></div> : null}
                              {chat.product.starts === 4 ? <div className="productStart4"></div> : null}
                              {chat.product.starts === 5 ? <div className="productStart5"></div> : null}
                              ({chat.product.totalReviews})
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    }
                  } else {
                    if (!mappedProductIds.has(chat.product.id)) {
                      mappedProductIds.add(chat.product.id);
                      return (

                        <Card key={index} className="cardProduct3" onClick={() => handleConversation(chat.product.id, chat.userUser.id)}>
                          <Card.Text>COMPRO</Card.Text>
                          <Card.Img className="imageProductCard3" src={chat.product.image} />
                          <Card.Body>
                            <Card.Title className="cardTitle3">{chat.product.name.toUpperCase()}&nbsp;&nbsp;{chat.userOwner.name.toUpperCase()}</Card.Title>
                            <div className="cardPrice3">
                              {chat.product.hourPrice}€/hora &nbsp;&nbsp; {chat.product.dayPrice}€/día &nbsp;&nbsp; {chat.product.depositPrice}€/fianza
                            </div>

                            <div className="startCard3">
                              {chat.product.starts === 0 ? <div className="productStart0"></div> : null}
                              {chat.product.starts === 1 ? <div className="productStart1"></div> : null}
                              {chat.product.starts === 2 ? <div className="productStart2"></div> : null}
                              {chat.product.starts === 3 ? <div className="productStart3"></div> : null}
                              {chat.product.starts === 4 ? <div className="productStart4"></div> : null}
                              {chat.product.starts === 5 ? <div className="productStart5"></div> : null}
                              ({chat.product.totalReviews})
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    }
                  }
                  return null;
                })}
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
