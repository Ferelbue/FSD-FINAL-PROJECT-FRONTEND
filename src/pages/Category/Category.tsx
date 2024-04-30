
import { BringCategoryProducts } from "../../services/apiCalls";
import { DataFetched } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Category.css";
import { categoryData } from "../../app/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Card } from "react-bootstrap";
import { updateProductDetail } from "../../app/slices/productDetailSlice";
import { useNavigate } from "react-router-dom";

export const Category: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const rdxCategory = useSelector(categoryData);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("asd")
    const bringData = async () => {

      const fetched: DataFetched = await BringCategoryProducts(rdxCategory.category);

      if (fetched.success) {
        setProducts(fetched.data);
        console.log(fetched, "hola soy fetched");
      } else {
        setError(fetched.message);
      }
    };

    if (!products.length) {
      bringData();
    }
  }, [products, rdxCategory]);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched = await BringCategoryProducts(rdxCategory.category);
      setProducts(fetched.data);
    }
    bringData();
  }, [rdxCategory]);

  const handleDetail = (productId:number,ownerId:number) => {
    console.log(productId, "productId")
    dispatch(updateProductDetail({ productDetail: {productId:productId,userUserId:ownerId}}));
    navigate("/productDetail")
  }


  return (
    <div className="home">
      <div className="categoryTitle2">
        {products[0]?.category?.name.toUpperCase()}
      </div>
      <div className="row justify-content-around categoryProducts">
        {products.map((product) => (
          <div className="col-sm-12 col-md-6 col-lg-3" key={product.id}>
            <Card className="cardProduct" onClick={() => handleDetail(product.id,product.owner.id)}>
              <Card.Img className="imageProductCard" src={product.image} />
              <Card.Body>
                <Card.Title className="cardTitle">{product.name.toUpperCase()}</Card.Title>
                <div className="cardPrice">
                  {product.hourPrice}€/hora &nbsp;&nbsp; {product.dayPrice}€/día
                </div>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
              <div className="startCard">
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
        ))}
      </div>


    </div>
  );
};
