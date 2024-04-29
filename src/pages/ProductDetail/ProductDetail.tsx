
import { BringCategoryProducts, BringProductDetail } from "../../services/apiCalls";
import { DataFetched, DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./ProductDetail.css";
import { categoryData } from "../../app/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { productDetailData } from "../../app/slices/productDetailSlice";

export const ProductDetail: React.FC = () => {
  const [product, setProducts] = useState<any>();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();


  useEffect(() => {
    const bringData = async () => {
      console.log(rdxProductDetail.productDetail, "rdxCategory.category")
      const fetched: DataFetched2 = await BringProductDetail(rdxProductDetail.productDetail.productId);

      if (fetched.success) {
        setProducts(fetched.data);
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

  const handleConversation = async () => {
    console.log(rdxUser)
    if (!rdxUser.credentials) {
      navigate("/login")
    } else {
      navigate("/conversation")
    }
  }


  return (
    <div className="home">
      {product ? (
        <>
          <div className="conversationCard">
            <div className="imageConversation" onClick={() => handleConversation()} />
          </div>
          <div className="categoryTitle2">
            {product.name.toUpperCase()}
          </div>
          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct2">
                <Card.Img className="imageProductCard2" src={product.image} />
                <Card.Body>
                  <Card.Title className="cardTitle2">{product.name.toUpperCase()}</Card.Title>
                  <div className="cardPrice2">
                    {product.hourPrice}€/hora &nbsp;&nbsp; {product.dayPrice}€/día &nbsp;&nbsp; {product.depositPrice}€/fianza
                  </div>
                  <Card.Text className="descriptionCard2">{product?.description}</Card.Text>
                </Card.Body>
                <div className="cardCity2">
                  <div className="imageLocation" /> {product.city}
                </div>
                <div className="mapCard2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.9783706774037!2d-0.37939527633656633!3d39.46981734209591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f54c438bba5%3A0xb2eb0eca85a322aa!2sPla%C3%A7a%20de%20l&#39;Ajuntament!5e0!3m2!1ses-419!2ses!4v1714402608949!5m2!1ses-419!2ses"
                    style={{ border: 0, height: '350px', width: '450px', position: 'relative', top: '-125px', left: '-50px' }}
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                <div className="startCard2">
                  <div className="imageChat2" title="My chats" />
                  {product.starts === 0 ? <div className="productStart0"></div> : null}
                  {product.starts === 1 ? <div className="productStart1"></div> : null}
                  {product.starts === 2 ? <div className="productStart2"></div> : null}
                  {product.starts === 3 ? <div className="productStart3"></div> : null}
                  {product.starts === 4 ? <div className="productStart4"></div> : null}
                  {product.starts === 5 ? <div className="productStart5"></div> : null}
                  ({product.reviews.length})
                </div>
                {product.reviews.map((review: any) => (
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
