
import { BringProducts, BringProductsNumber, DeleteProductById, DeleteUserById, Notification } from "../../services/apiCalls";
import { DataFetched2, UserUpdateRole } from "../../interfaces";
import { useEffect, useState } from "react";
import "./AdminProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { updateNotification } from "../../app/slices/notificationSlice";
import { ROOT2 } from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { searchData2, updateCriteria2 } from "../../app/slices/search2Slice";
import { Pagination } from "react-bootstrap";

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<any>("");
  const dispatch = useDispatch();
  const searchRdx2 = useSelector(searchData2);
  const rdxUser = useSelector(userData);
  const [criteria2, setCriteria2] = useState("")
  const [nameCriteria2, setNameCriteria2] = useState("")
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [maxPag, setMaxPag] = useState(0);

  const notiMe = async (): Promise<void> => {
    const fetched2: DataFetched2 = await Notification(rdxUser.credentials.token);
    if (fetched2.data[0].length === 0 && fetched2.data[1].length === 0) {
      dispatch(updateNotification({ notification: false }));
    } else {
      dispatch(updateNotification({ notification: true }));
    }
  }
  notiMe();

  useEffect(() => {
    const searching = setTimeout(() => {
      dispatch(updateCriteria2(nameCriteria2));
    }, 375);

    return () => clearTimeout(searching);
  }, [criteria2]);

  const searchHandler = (e: any) => {
    setCriteria2(e.target.value)
    setNameCriteria2(e.target.value.toLowerCase())
    console.log(nameCriteria2, "criteria2");
  }

  useEffect(() => {
    const bringData = async () => {

      console.log(searchRdx2.criteria, "searchRdx2.criteria");
      const fetched: DataFetched2 = await BringProducts(searchRdx2.criteria, currentPage, "10");
      const fetched2: DataFetched2 = await BringProductsNumber();

      console.log(fetched.data, "fetched");

      setProducts(fetched.data);
      setMaxPag(Math.ceil(fetched2.data.length / 10))

      if (error) {
        console.log(error, "error");
      }


    };
    bringData();

  }, [searchRdx2.criteria, currentPage]);

  const handleDelete = async (productId: number) => {
    try {
      await DeleteProductById(rdxUser.credentials.token, productId);


      const fetched: DataFetched2 = await BringProducts("",currentPage, "10");
      setProducts(fetched.data);

    } catch (error) {
      setError(error);
      console.log(error, "error")
    }
  };

  return (
    <div className="category">

      <div className="categoryTitle3">
        <div className="categoryTitle37">
          ADMIN PRODUCTS
        </div>
        <div>
          <div className="inputHeader">
            <CustomInput
              className={`inputSearch2`}
              type="text"
              placeholder="search a product...."
              name="product"
              disabled={false}
              value={criteria2 || ""}
              onChange={(e: any) => searchHandler(e)}
            />
          </div>
        </div>
      </div>
      {products ? (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Hour Price</th>
                  <th>Day Price</th>
                  <th>City</th>
                  <th>Category</th>
                  <th>Owner</th>
                  <th>Stars</th>
                  <th>Total Reviews</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product.id}>
                    <td><img src={`${ROOT2}uploads/${product.image}`} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.hourPrice}</td>
                    <td>{product.dayPrice}</td>
                    <td>{product.city}</td>
                    <td>{product.category.name}</td>
                    <td>{product.owner.name}</td>
                    <td>{product.starts}</td>
                    <td>{product.totalReviews}</td>
                    <td>
                      {rdxUser.credentials.user.roleName !== "user"
                        ? (
                          <img src={`${ROOT2}uploads/pot.png`} alt={product.name} style={{ width: '30px', height: '30px', cursor: 'pointer', margin: '0.2em' }} onClick={() => handleDelete(product.id)} />
                        )
                        : null
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <Pagination>
              <Pagination.Item onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </Pagination.Item>
              <Pagination.Item>{currentPage}</Pagination.Item>
              <Pagination.Item onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === maxPag}>
                Next
              </Pagination.Item>
            </Pagination>
          </div>
        </>
      ) : (
        <div className="cardProduct33">Any product found...</div>
      )
      }
    </div >
  );
};
