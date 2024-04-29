
import { BringCategoryProducts, BringConversation, BringProductDetail } from "../../services/apiCalls";
import { DataFetched, DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Conversation.css";
import { categoryData } from "../../app/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { productDetailData } from "../../app/slices/productDetailSlice";

export const Conversation: React.FC = () => {
  const [product, setProducts] = useState<any>();
  const [conversation, setConversation] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();


  useEffect(() => {
    const bringData = async () => {
      console.log(rdxProductDetail.productDetail, rdxUser.credentials, "rdxCategory.category")
      const fetched: DataFetched2 = await BringConversation(rdxProductDetail.productDetail.productId, rdxUser.credentials.user.userId, rdxUser.credentials.token);

      if (fetched.success) {
        setConversation(fetched.data);
        console.log(fetched, "hola soy fetched");
      } else {
        setError(fetched.message);
      }
    };

    if (!product) {
      bringData();
    }
  }, []);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched2 = await BringProductDetail(rdxProductDetail.productDetail.productId);
      setProducts(fetched.data);
    }
    bringData();
  }, [rdxProductDetail]);

  return (
    <div className="conversation">
      {conversation ? (
        <>
          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct2">
                {conversation.map((convers, index) => (
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
