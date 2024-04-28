
import { BringProducts } from "../../services/apiCalls";
import { DataFetched } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Home.css";

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
            const firstProductOfCategory = products.find(product => product?.category?.id === i);

            return (
              <div>
                {firstProductOfCategory && 
                <div className="categoryTitle">
                  {firstProductOfCategory.category.name.toUpperCase()}
                  </div>}

                {products.map((product) => {
                  return (
                    product?.category?.id === i && (
                      <div key={product.id} className="product">
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <img src={product.image} alt={product.name} />
                        <p>{product.hourPrice}</p>
                        <p>{product.dayPrice}</p>
                        <p>{product.category?.name}</p>
                      </div>
                    )
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
