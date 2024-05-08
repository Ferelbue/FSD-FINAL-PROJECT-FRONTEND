
import { BringProductDetail, UploadImage, UploadProducto } from "../../services/apiCalls";
import { CategoryData, DataFetched2, FileImageData, MessageData, ProductData5 } from "../../interfaces";
import { useEffect, useState, useRef } from "react";
import "./UploadProduct.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card, Dropdown, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { productDetailData } from "../../app/slices/productDetailSlice";
import { CInput2 } from "../../common/CInput2/CInput2";
import { CInput } from "../../common/CInput/CInput";
import { ROOT2 } from "../../services/apiCalls"
import { CInput1 } from "../../common/CInput1/CInput1";

export const UploadProduct: React.FC = () => {
  const [product, setProducts] = useState<ProductData5>();
  const [dataImage, setDataImage] = useState<FileImageData>();
  const [error, setError] = useState<string>("");
  const rdxProductDetail = useSelector(productDetailData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<MessageData>({
    text: "",
  });
  const [title, setTitle] = useState<MessageData>({
    text: "",
  });
  const [hourPrice, setHourPrice] = useState<MessageData>({
    text: "",
  });
  const [dayPrice, setDayPrice] = useState<MessageData>({
    text: "",
  });
  const [deposit, setDeposit] = useState<MessageData>({
    text: "",
  });
  const [city, setCity] = useState<MessageData>({
    text: "",
  });
  const [category, setCategory] = useState<CategoryData>({
    category: "",
    categoryId: 0
  });
  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage((prevState: MessageData) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle((prevState: MessageData) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourPrice((prevState: MessageData) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayPrice((prevState: MessageData) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler5 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit((prevState: MessageData) => ({
      ...prevState,
      text: e.target.value,
    }));
  };
  const inputHandler6 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity((prevState: MessageData) => ({
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
        console.log(error)
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = fileInput?.current?.files?.[0];
    const formData = new FormData();
    if (file) {
      const date = new Date();
      const timestamp = date.getTime();
      const newFileName = `${timestamp}-${file.name}`;
      formData.append('image', file, newFileName);
    } else {
      console.error('No file selected');
    }
    console.log(formData, rdxUser.credentials.token, "formData")
    const fetched: DataFetched2 = await UploadImage(formData, rdxUser.credentials.token);
    console.log(fetched, "fetched")

    setDataImage(fetched.data);

  };

  const handleCat = (cat: string, id: number) => {
    setCategory({
      category: cat,
      categoryId: id
    });
  }

  const handleUploadProduct = async () => {
    if (!dataImage) {
      console.error('dataImage is undefined');
      return;
    }

    const fetched: DataFetched2 = await UploadProducto(title.text, message.text, dataImage.originalname, city.text, hourPrice.text, dayPrice.text, deposit.text, category.categoryId, rdxUser.credentials.token);
    console.log(fetched, "fetched")
    navigate("/home")
  }

  return (

    <div className="home">
      <div className="categoryTitle3">
        UPLOAD PRODUCT
      </div>
      {!product ? (
        <div className="spinnerCenter">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>

          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct2">
                <Card.Body>
                  <Card.Title className="cardTitle22">
                    <div className="titleUpload2">
                      TITULO
                    </div>
                    <div>
                      <CInput1
                        className="inputConversation2"
                        type="text"
                        name="message"
                        placeholder="Escribe un nombre de producto"
                        value={title.text || ""}
                        onChange={(e) => inputHandler2(e)}
                      />
                    </div>
                  </Card.Title>
                  <Card.Text className="descriptionCard22">
                    <div className="titleUpload5">
                      DESCRIPCION
                    </div>
                    <CInput2
                      className="inputConversation22"
                      placeholder="Escribe un mensaje"
                      name="message"
                      disabled={false}
                      value={message.text || ""}
                      onChange={(e) => inputHandler(e)}
                    />
                  </Card.Text>
                  <Dropdown className="categoryGroup">
                    <div className="titleUpload3">
                      CATEGORIA
                    </div>
                    <div>
                      <Dropdown.Toggle className="dropdownStar3">
                        {category.category === ""
                          ? "SELECCIONA UNA CATEGORIA"
                          : (category.category)
                        }
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu className="dropdownStar33">
                      <Dropdown.Item href="#/action-1" onClick={() => handleCat("Agricola-Forestal", 1)}>Agricola-Forestal</Dropdown.Item>
                      <Dropdown.Item href="#/action-2" onClick={() => handleCat("Construcción", 2)}>Construcción</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Bricolaje", 3)}>Bricolaje</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Carpintería", 4)}>Carpintería</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Electricidad", 5)}>Electricidad</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Fontanería", 6)}>Fontanería</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Medición", 7)}>Medición</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Jardinería", 8)}>Jardinería</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Limpieza", 9)}>Limpieza</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Llaves Manuales", 10)}>Llaves Manuales</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Metal", 11)}>Metal</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Pintura", 12)}>Pintura</Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={() => handleCat("Carga-Movimiento", 13)}>Electricidad</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="imageGroup">
                    <div className="titleUpload">
                      IMAGEN
                    </div>
                    <div>
                      <form onSubmit={handleSubmit}>
                        <input type="file" ref={fileInput} onChange={handleSubmit} id="fileInput" style={{ width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: -1 }} />
                        <label htmlFor="fileInput" className="custom-file-upload">
                          Upload Image
                        </label>
                      </form>
                    </div>
                    <div>

                      {dataImage
                        ? <Card.Img className="imageProductCard22" src={`${ROOT2}${dataImage.destination}${dataImage.originalname}`} />
                        : <Card.Img className="imageProductCard22" />
                      }
                    </div>
                  </div>

                  <div className="cardPrice22">
                    <div className="titleUpload4">
                      TARIFAS
                    </div>
                    <div className="pricesUpload">
                      <CInput
                        className="inputConversation3"
                        type="number"
                        name="message"
                        placeholder="..."
                        min="0"
                        value={hourPrice.text || ""}
                        onChange={(e) => inputHandler3(e)}
                      />
                      €/hora &nbsp;&nbsp;
                      <CInput
                        className="inputConversation3"
                        type="number"
                        name="message"
                        placeholder="..."
                        min="0"
                        value={dayPrice.text || ""}
                        onChange={(e) => inputHandler4(e)}
                      />
                      €/día &nbsp;&nbsp;
                      <CInput
                        className="inputConversation3"
                        type="number"
                        name="message"
                        placeholder="..."
                        min="0"
                        value={deposit.text || ""}
                        onChange={(e) => inputHandler5(e)}
                      />
                      €/fianza
                    </div>
                  </div>
                </Card.Body>
                <div className="cityCard22">
                  <div className="titleUpload5">
                    CIUDAD
                  </div>
                  <CInput1
                    className="inputConversation2"
                    type="text"
                    name="message"
                    placeholder="Escribe una ciudad"
                    value={city.text || ""}
                    onChange={(e) => inputHandler6(e)}
                  />
                </div>
                <button className="buttonLogin2" onClick={() => handleUploadProduct()}>UPLOAD</button>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
