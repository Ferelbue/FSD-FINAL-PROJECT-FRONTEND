
import { AddToFavorites, BringCategoryProducts, BringFavoriteUserProduct, BringProductDetail } from "../../services/apiCalls";
import { DataFetched, DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./UploadProduct.css";
import { categoryData } from "../../app/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { productDetailData } from "../../app/slices/productDetailSlice";
import { CInput2 } from "../../common/CInput2/CInput2";
import { CInput } from "../../common/CInput/CInput";

export const UploadProduct: React.FC = () => {
  const [product, setProducts] = useState<any>();
  const [favorite, setFavorite] = useState<any>();
  const [addTofavorite, setAddToFavorite] = useState<any>();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const [message, setMessage] = useState<any>({
    text: "",
  });
  const [title, setTitle] = useState<any>({
    text: "",
  });
  const [hourPrice, setHourPrice] = useState<any>({
    text: "",
  });
  const [dayPrice, setDayPrice] = useState<any>({
    text: "",
  });
  const [deposit, setDeposit] = useState<any>({
    text: "",
  });
  const [city, setCity] = useState<any>({
    text: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage((prevState: any) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle((prevState: any) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourPrice((prevState: any) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayPrice((prevState: any) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler5 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit((prevState: any) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler6 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity((prevState: any) => ({
      ...prevState,
      text: e.target.value,
    }));
  };

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

  useEffect(() => {
    const bringData = async () => {
      const fetched2: DataFetched2 = await BringFavoriteUserProduct(rdxProductDetail.productDetail.productId, rdxUser.credentials.token);
      setFavorite(fetched2.data);
      console.log(fetched2, "fetched2")
    }
    bringData();
  }, [addTofavorite]);

  const handleAddFavorite = async () => {

    const fetched3: DataFetched2 = await AddToFavorites(rdxProductDetail.productDetail.productId, rdxUser.credentials.token)
    console.log(fetched3, "fetched3")
    setAddToFavorite(fetched3.data);

  }
  console.log(favorite, "favorite")

  return (
    <div className="home">
        <>
          <div className="categoryTitle3">
            UPLOAD PRODUCT
          </div>
          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct2">
                <div>
                  <Card.Img className="imageProductCard22"/>
                  <button>IMAGEN</button>
                </div>
                <Card.Body>
                  <Card.Title className="cardTitle22">
                    TITULO
                    <CInput
                      className="inputConversation2"
                      type="text"
                      name="message"
                      placeholder="Escribe un nombre de producto"
                      value={title.text || ""}
                      onChange={(e) => inputHandler2(e)}
                    />
                  </Card.Title>

                  <div className="cardPrice22">
                    <>
                      TARIFAS
                    </>
                    <div className="pricesUpload">
                    <CInput
                      className="inputConversation3"
                      type="number"
                      name="message"
                      placeholder="..."
                      value={hourPrice.text || ""}
                      onChange={(e) => inputHandler3(e)}
                    />
                    €/hora &nbsp;&nbsp;
                    <CInput
                      className="inputConversation3"
                      type="number"
                      name="message"
                      placeholder="..."
                      value={dayPrice.text || ""}
                      onChange={(e) => inputHandler4(e)}
                    />
                    €/día &nbsp;&nbsp;
                    <CInput
                      className="inputConversation3"
                      type="number"
                      name="message"
                      placeholder="..."
                      value={deposit.text || ""}
                      onChange={(e) => inputHandler5(e)}
                    />
                    €/fianza
                    </div>
                  </div>
                  <Card.Text className="descriptionCard22">
                    DESCRIPCIÓN
                    <CInput2
                      className="inputConversation"
                      placeholder="Escribe un mensaje"
                      name="message"
                      disabled={false}
                      value={message.text || ""}
                      onChange={(e) => inputHandler(e)}
                    />
                  </Card.Text>
                </Card.Body>
                <div>

                  <CInput
                    className="inputConversation2"
                    type="text"
                    name="message"
                    placeholder="Escribe una ciudad"
                    value={city.text || ""}
                    onChange={(e) => inputHandler6(e)}
                  />
                </div>
              </Card>
            </div>
          </div>

        </>
    </div>
  );
};
