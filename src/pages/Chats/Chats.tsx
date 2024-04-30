
import { BringAllChats, BringConversation, BringProductDetail, SendMessage } from "../../services/apiCalls";
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


export const Chats: React.FC = () => {
  const [chats, setChats] = useState<any>();
  const [error, setError] = useState<string>("");
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched2 = await BringAllChats(rdxUser.credentials.token);
      console.log(fetched, "fetched");
      setChats(fetched.data);
    }
    bringData();
  }, [rdxProductDetail]);

  const handleConversation = async (productId: number, userUserId: number) => {
    console.log(productId, userUserId, rdxUser.credentials.token, "handleConversation");
    dispatch(updateProductDetail({ productDetail: { productId: productId, userUserId: userUserId } }));
    navigate('/conversation')
  }
  let mappedProductIds = new Set();
  let mappedUserIds = new Set();
  return (
    <div className="conversation">
      {chats ? (
        <>
          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct2">
                {chats.map((chat: any) => {
                  if (chat.userOwner.id === rdxUser.credentials.user.userId) {
                    if (!mappedUserIds.has(chat.userUser.id)) {
                      // mappedProductIds.add(chat.product.id);
                      mappedUserIds.add(chat.userUser.id);
                      return (
                        <Card.Body className="chatCard3" onClick={() => handleConversation(chat.product.id, chat.userUser.id)}>
                          <Card.Text>VENDO</Card.Text>
                          <Card.Img className="imageProductCard3" src={chat.product.image} />
                          <Card.Text>{chat.product.name}</Card.Text>
                          <Card.Text>{chat.userUser.name}</Card.Text>
                        </Card.Body>
                      );
                    }
                  } else {
                    if (!mappedProductIds.has(chat.product.id)) {
                      mappedProductIds.add(chat.product.id);
                      return (
                        <Card.Body className="chatCard4" onClick={() => handleConversation(chat.product.id, chat.userUser.id)}>
                          <Card.Text>COMPRO</Card.Text>
                          <Card.Img className="imageProductCard4" src={chat.product.image} />
                          <Card.Text>{chat.product.name}</Card.Text>
                          <Card.Text>{chat.userOwner.name}</Card.Text>
                        </Card.Body>
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
