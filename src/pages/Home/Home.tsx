
import { BringProducts } from "../../services/apiCalls";
import { DataFetched } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Home.css";
import { Card, Carousel } from "react-bootstrap";

export const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [firstFetch, setFirstFetch] = useState<boolean>(false);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched = await BringProducts();

      if (fetched.success) {
        console.log(fetched, "hola soy fetched");
        setFirstFetch(true);

        setProducts(fetched.data);
      } else {
        setError(fetched.message);
      }
    };

    if (!firstFetch) {
      bringData();
    }
  }, [products]);

  return (
    <div className="home">
      {products.length === 0 ? (
        <div>{error}</div>
      ) : (
        <div>
          {Array.from({ length: 13 }).map((_, i) => {
            const productsOfCategory = products.filter(product => product?.category?.id === i);
            const arrayProducts = [];
            const carouselSize = 4;

            for (let j = 0; j < productsOfCategory.length; j += carouselSize) {
              arrayProducts.push(productsOfCategory.slice(j, j + carouselSize));
            }

            return (
              <div key={i}>
                {productsOfCategory[0] &&
                  <>
                    <div className="categoryTitle">
                      {productsOfCategory[0].category.name.toUpperCase()}
                    </div>
                    <Carousel>
                      {arrayProducts.map((block, blockIndex) => (
                        <Carousel.Item key={blockIndex}>
                          <div className="row justify-content-around carouselProducts">
                            {block.map((product) => (
                              <div className="col-sm-12 col-md-6 col-lg-3" key={product.id}>
                                <Card className="cardProduct">
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
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </>
                }

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
