
import { AddToFavorites, BringCategoryProducts, BringFavoriteUserProduct, BringProductDetail, UploadImage, UploadProducto } from "../../services/apiCalls";
import { DataFetched, DataFetched2 } from "../../interfaces";
import { useEffect, useState, useRef } from "react";
import "./UploadProduct.css";
import { categoryData } from "../../app/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { productDetailData } from "../../app/slices/productDetailSlice";
import { CInput2 } from "../../common/CInput2/CInput2";
import { CInput } from "../../common/CInput/CInput";
import { ROOT2 } from "../../services/apiCalls"

export const UploadProduct: React.FC = () => {
  const [product, setProducts] = useState<any>();
  const [favorite, setFavorite] = useState<any>();
  const [dataImage, setDataImage] = useState<any>();
  const [addTofavorite, setAddToFavorite] = useState<any>();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);

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
  const [category, setCategory] = useState<any>({
    category: "",
    categoryId: 0
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



  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const file = fileInput?.current?.files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    } else {
      console.error('No file selected');
    }

    const fetched: DataFetched2 = await UploadImage(formData, rdxUser.credentials.token);
    console.log(fetched, "fetched")

    setDataImage(fetched.data);

  };

  const handleCat = (cat: string, id:number) => {
    setCategory({ 
      category: cat,
      categoryId: id
     });
  }

  const handleUploadProduct = async () => {
    const fetched: DataFetched2 = await UploadProducto(title.text, message.text, dataImage.originalname, city.text, hourPrice.text, dayPrice.text, deposit.text,category.categoryId, rdxUser.credentials.token);
    console.log(fetched, "fetched")

  }


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
                {dataImage
                  ? <Card.Img className="imageProductCard22" src={`${ROOT2}${dataImage.destination}${dataImage.originalname}`} />
                  : <Card.Img className="imageProductCard22" />
                }
                <form onSubmit={handleSubmit}>
                  <input type="file" ref={fileInput} />
                  <button type="submit">Upload</button>
                </form>
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
              <div className="cityCard22">
                CIUDAD
                <CInput
                  className="inputConversation2"
                  type="text"
                  name="message"
                  placeholder="Escribe una ciudad"
                  value={city.text || ""}
                  onChange={(e) => inputHandler6(e)}
                />
              </div>

              <Dropdown className="categoryGroup">
                CATEGORIA
                <Dropdown.Toggle className="dropdownStar3">
                  {category.category === ""
                    ? "CATEGORIA"
                    : (category.category)
                  }
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdownStar33">
                  <Dropdown.Item href="#/action-1" onClick={() => handleCat("Agricola-Forestal",1)}>Agricola-Forestal</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={() => handleCat("Construcción",2)}>Construcción</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Bricolaje",3)}>Bricolaje</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Carpintería",4)}>Carpintería</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Electricidad",5)}>Electricidad</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Fontanería",6)}>Fontanería</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Medición",7)}>Medición</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Jardinería",8)}>Jardinería</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Limpieza",9)}>Limpieza</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Llaves Manuales",10)}>Llaves Manuales</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Metal",11)}>Metal</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Pintura",12)}>Pintura</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => handleCat("Carga-Movimiento",13)}>Electricidad</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <button className="buttonLogin2" onClick={()=>handleUploadProduct()}>UPLOAD</button>
            </Card>
          </div>
        </div>

      </>
    </div>
  );
};
