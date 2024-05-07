
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
import { ROOT2 } from "../../services/apiCalls"
import dayjs from "dayjs";

export const Chats: React.FC = () => {
  const [chats, setChats] = useState<any>();
  const [buying, setBuying] = useState<boolean>(true);
  const [buyingNoti, setBuyingNoti] = useState<boolean>(false);
  const [selling, setSelling] = useState<boolean>(false);
  const [sellingNoti, setSellingNoti] = useState<boolean>(false);
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

    if (chats) {
      for (let i = 0; i < chats?.length; i++) {
        if ((chats[i].userOwner.id === rdxUser.credentials.user.userId) || (chats[i].userUser.id === rdxUser.credentials.user.userId)) {
          if (chats[i].userOwner_notification === true) {
            setSellingNoti(true);
          }
        } else {
          if (chats[i].userUser_notification === true) {
            setBuyingNoti(true);
          }
        }
      }
    }
    bringData();
  }, [rdxProductDetail]);

  const handleConversation = async (productId: number, userUserId: number) => {
    dispatch(updateProductDetail({ productDetail: { productId: productId, userUserId: userUserId } }));
    navigate('/conversation')
  }
  let mappedProductIds = new Set();
  let mappedUserIds = new Set();

  const handleBuying = () => {
    setBuying(true);
    setSelling(false);
  }

  const handleSelling = () => {
    setBuying(false);
    setSelling(true);
  }

  console.log(buyingNoti, sellingNoti);

  return (
    <div className="chats">
      {chats ? (
        chats.length > 0
          ? (
            <>
              <div>
                <div className="categoryTitle312">
                  <div>
                    MY CHATS
                  </div>
                  <div className="iconsProfile">
                    {buyingNoti
                      ? <div className="imageBuyingNoti" title="My buying chats" onClick={() => handleBuying()} />
                      : <div className="imageBuying" title="My buying chats" onClick={() => handleBuying()} />
                    }
                    {sellingNoti
                      ? <div className="imageSellingNoti" title="My selling chats" onClick={() => handleSelling()} />
                      : <div className="imageSelling" title="My selling chats" onClick={() => handleSelling()} />
                    }
                  </div>
                </div>
                <div className="categoryTitle351">
                  {buying ? "BUYING" : "SELLING"}
                </div>
                <div className="mx-auto">
                  <Card className="cardProduct4">
                    {chats.map((chat: any, index: number) => {
                      if (chat.userOwner.id === rdxUser.credentials.user.userId) {
                        if ((!mappedUserIds.has(chat.userUser.id)) && selling) {

                          mappedUserIds.add(chat.userUser.id);
                          return (
                            <Card key={index} className="cardProduct31" onClick={() => handleConversation(chat.product.id, chat.userUser.id)}>
                              <Card.Img className="imageProductCard4" src={`${ROOT2}uploads/${chat.product.image}`} />
                              <Card.Body>
                                <Card.Title className="cardTitle31">VENDO A&nbsp;{chat.userUser.name.toUpperCase()}</Card.Title>
                                <Card.Title className="cardTitle32">{chat.product.name.toUpperCase()}</Card.Title>
                                <div className="timeChat">
                                  <Card.Text className="cardText31">Ultimo mensaje:&nbsp;{dayjs(chat.updated_at).format('YYYY-MM-DD HH:mm')}</Card.Text>
                                </div>
                                {chat.userOwner_notification === true
                                  ? <img src={`${ROOT2}uploads/notiChats.png`} alt={chat.id} className="notiChats" />
                                  : null
                                }
                              </Card.Body>
                            </Card>
                          );
                        }
                      } else {
                        if ((!mappedProductIds.has(chat.product.id)) && buying) {
                          mappedProductIds.add(chat.product.id);
                          return (
                            <Card key={index} className="cardProduct32" onClick={() => handleConversation(chat.product.id, chat.userUser.id)}>
                              <Card.Img className="imageProductCard4" src={`${ROOT2}uploads/${chat.product.image}`} />
                              <Card.Body>
                                <Card.Title className="cardTitle31">COMPRO A&nbsp;{chat.userOwner.name.toUpperCase()}</Card.Title>
                                <Card.Title className="cardTitle32">{chat.product.name.toUpperCase()}</Card.Title>
                                <div className="timeChat">
                                  <Card.Text className="cardText31">Ultimo mensaje:&nbsp;{dayjs(chat.updated_at).format('YYYY-MM-DD HH:mm')}</Card.Text>
                                </div>
                                {chat.userUser_notification === true
                                  ? <img src={`${ROOT2}uploads/notiChats.png`} alt={chat.id} className="notiChats" />
                                  : null
                                }
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
          )
          : (
            <div className="cardProduct4">
              <div className="noChats2">No tienes chats</div>
            </div>
          )

      ) : (
        <div>Cargando chats...</div>
      )}
    </div>
  );
};
