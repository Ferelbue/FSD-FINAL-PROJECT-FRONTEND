
import { BringAllChats, Notification } from "../../services/apiCalls";
import { DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Chats.css";
import { useSelector, } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import { productDetailData, updateProductDetail } from "../../app/slices/productDetailSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../app/slices/notificationSlice";

export const Chats: React.FC = () => {
  const [chats, setChats] = useState<any>();
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
                        <Card key={index} className="cardProduct31" onClick={() => handleConversation(chat.product.id, chat.userUser.id)}>
                          <Card.Img className="imageProductCard3" src={chat.product.image} />
                          <Card.Text>&nbsp;&nbsp;VENDO</Card.Text>
                          <Card.Body>
                            <Card.Title className="cardTitle3">{chat.product.name.toUpperCase()}&nbsp;&nbsp;{chat.userUser.name.toUpperCase()}</Card.Title>
                          </Card.Body>
                        </Card>
                      );
                    }
                  } else {
                    if (!mappedProductIds.has(chat.product.id)) {
                      mappedProductIds.add(chat.product.id);
                      return (

                        <Card key={index} className="cardProduct32" onClick={() => handleConversation(chat.product.id, chat.userUser.id)}>
                          <Card.Img className="imageProductCard3" src={chat.product.image} />
                          <Card.Text>&nbsp;&nbsp;COMPRO</Card.Text>
                          <Card.Body>
                            <Card.Title className="cardTitle3">{chat.product.name.toUpperCase()}&nbsp;&nbsp;{chat.userOwner.name.toUpperCase()}</Card.Title>
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
