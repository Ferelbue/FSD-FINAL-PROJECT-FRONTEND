
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
    <div>
      {products.length === 0 ? (
        <div>{error}</div>
      ) : (
        <div>
          {products.map((person) => {
            return (
              <div key={person.id} className="product">
                <h1>{person.name}</h1>
                <p>{person.description}</p>
                <img src={person.image} alt={person.name} />
                <p>{person.hourPrice}</p>
                <p>{person.dayPrice}</p>
                <p>{person.category?.name}</p>
              </div>
            );
         
          })}
        </div>
      )}
    </div>
  );
};
