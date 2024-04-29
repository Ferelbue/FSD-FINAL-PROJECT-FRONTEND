
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

  const handleConversation = async (productId:number,userUserId:number) => {
    console.log(productId, userUserId, rdxUser.credentials.token, "handleConversation");
    dispatch(updateProductDetail({ productDetail: {productId:productId,ownerId:userUserId}}));
    navigate('/conversation')
  }
  return (
    <div className="conversation">
      {chats ? (
        <>
          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct2">
                {chats.map((chatObject: Record<string, Array<any>>, index: number) => {
                  // Accede a cada objeto en chatObject
                  return Object.entries(chatObject).map(([_, chatArray], innerIndex) => {
                    const firstChat = chatArray[0];  // Accede al primer chat en el array
                    return (
                      <div key={`${index}-${innerIndex}`} >
                        {firstChat.userOwner.id === rdxUser.credentials.user.userId ? (
                          <Card.Body className="chatCard3" onClick={()=>handleConversation(firstChat.product.id,firstChat.userUser.id)}>
                            <Card.Text>VENDO</Card.Text>
                            <Card.Img className="imageProductCard3" src={firstChat.product.image} />
                            <Card.Text>{firstChat.product.name}</Card.Text>
                            <Card.Text>{firstChat.userUser.name}</Card.Text>
                          </Card.Body>
                        ) : (
                          <Card.Body className="chatCard4" onClick={()=>handleConversation(firstChat.product.id,firstChat.userUser.id)}>
                            <Card.Text>COMPRO</Card.Text>
                            <Card.Img className="imageProductCard4" src={firstChat.product.image} />
                            <Card.Text>{firstChat.product.name}</Card.Text>
                            <Card.Text>{firstChat.userOwner.name}</Card.Text>
                          </Card.Body>
                        )}
                      </div>
                    );
                  })
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
