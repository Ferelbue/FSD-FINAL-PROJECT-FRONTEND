
import { BringCategoryProducts, BringProductDetail } from "../../services/apiCalls";
import { DataFetched, DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./ProductDetail.css";
import { categoryData } from "../../app/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import GoogleMapReact from 'google-map-react';
import { updateProductDetail } from "../../app/slices/productDetailSlice";
import { useNavigate } from "react-router-dom";

export const ProductDetail: React.FC = () => {
  const [product, setProducts] = useState<any>();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const rdxCategory = useSelector(categoryData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();

  const defaultProps:any = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  interface AnyReactComponentProps {
    text: string;
    lat: number;
    lng: number;
  }


  const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => <div>{text}</div>;


  useEffect(() => {
    console.log("asd")
    const bringData = async () => {

      const fetched: DataFetched2 = await BringProductDetail(rdxCategory.category);

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
      const fetched: DataFetched2 = await BringProductDetail(rdxCategory.category);
      setProducts(fetched.data);
    }
    bringData();
  }, [rdxCategory]);



  return (
    <div className="home">
      {product ? (
        <>
          <div className="categoryTitle2">
            {product.name.toUpperCase()}
          </div>
          <div className="categoryProducts2">
            <div className="mx-auto">
              <Card className="cardProduct2">
                <Card.Img className="imageProductCard2" src={product.image} />
                <Card.Body>
                  <Card.Title className="cardTitle2">{product.name.toUpperCase()}&nbsp;-&nbsp; ({product.city})</Card.Title>
                  <div className="cardPrice2">
                    {product.hourPrice}€/hora &nbsp;&nbsp; {product.dayPrice}€/día &nbsp;&nbsp; {product.depositPrice}€
                  </div>
                  <Card.Text>{product?.description}</Card.Text>
                </Card.Body>
                <div className="startCard2">
                  {product.starts === 0 ? <div className="productStart0"></div> : null}
                  {product.starts === 1 ? <div className="productStart1"></div> : null}
                  {product.starts === 2 ? <div className="productStart2"></div> : null}
                  {product.starts === 3 ? <div className="productStart3"></div> : null}
                  {product.starts === 4 ? <div className="productStart4"></div> : null}
                  {product.starts === 5 ? <div className="productStart5"></div> : null}
                  ({product.totalReviews})
                </div>
              </Card>
            </div>
          </div>
          <div style={{ height: '100vh', width: '100%' }}>
            hola
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyB0fV5CKp0IUVUmrvLt_k1mhIMVvICZ8oU" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </>
      ) : (
        <div>Cargando producto...</div>
      )}
    </div>
  );
};
