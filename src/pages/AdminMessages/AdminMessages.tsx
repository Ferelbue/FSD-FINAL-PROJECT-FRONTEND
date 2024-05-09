
import { BringAllMessagesNumber, BringAllmessages, DeleteMessageById, Notification } from "../../services/apiCalls";
import { DataFetched2, DataFetched3, ProductData } from "../../interfaces";
import { useEffect, useState } from "react";
import "./AdminMessages.css";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { updateNotification } from "../../app/slices/notificationSlice";
import { ROOT2 } from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { searchData2, updateCriteria2 } from "../../app/slices/search2Slice";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ProductData[]>([]);
  const [error, setError] = useState<DataFetched3>();
  const dispatch = useDispatch();
  const searchRdx2 = useSelector(searchData2);
  const rdxUser = useSelector(userData);
  const [criteria2, setCriteria2] = useState<string>("")
  const [nameCriteria2, setNameCriteria2] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [maxPag, setMaxPag] = useState<number>(0);
  const navigate = useNavigate();

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
    if (rdxUser.credentials === "" || rdxUser.credentials.user.roleName === "user") {
      navigate("/home");
    }

  }, [rdxUser]);

  useEffect(() => {
    const searching = setTimeout(() => {
      dispatch(updateCriteria2(nameCriteria2));
    }, 375);

    return () => clearTimeout(searching);
  }, [criteria2]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCriteria2(e.target.value)
    setNameCriteria2(e.target.value.toLowerCase())
  }

  useEffect(() => {
    const bringData = async () => {

      const fetched: DataFetched2 = await BringAllmessages(rdxUser.credentials.token, searchRdx2.criteria, currentPage);
      const fetched2: DataFetched2 = await BringAllMessagesNumber(rdxUser.credentials.token);

      setMessages(fetched.data);
      setMaxPag(Math.ceil(fetched2.data / 10))
      console.log(fetched2.data, "maxPag")
      if (error) {
        console.log(error, "error");
      }


    };
    bringData();

  }, [searchRdx2.criteria, currentPage]);

  const handleDelete = async (messageId: number) => {
    try {
      await DeleteMessageById(rdxUser.credentials.token, messageId);

      const fetched: DataFetched2 = await BringAllmessages(rdxUser.credentials.token, "", currentPage);
      setMessages(fetched.data);
      console.log(fetched.data, "fetched");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError({
          message: error.message,
          success: false
        });
      }
      console.log(error, "error")
    }
  };


  console.log(messages, "productdasdasdasdasds");

  return (
    <div className="category">
      <div className="categoryTitle3">
        <div className="categoryTitle37">
          ADMIN MESSAGES
        </div>
        <div>
          <div className="inputHeader">
            <CustomInput
              className={`inputSearch2`}
              type="text"
              placeholder="search a message...."
              name="product"
              disabled={false}
              value={criteria2 || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchHandler(e)}
            />
          </div>
        </div>
      </div>
      {messages ? (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Owner</th>
                  <th>User</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((product: any) => (
                  <tr key={`${product.product.name}-${product.userOwner.name}-${product.userUser.name}-${product.created_at}`}>
                    <td>{product.product.name}</td>
                    <td>{product.userOwner.name}</td>
                    <td>{product.userUser.name}</td>
                    <td>{product.message}</td>
                    <td>
                      {rdxUser.credentials.user.roleName !== "user"
                        ? (
                          <img src={`${ROOT2}uploads/pot.png`} alt={product.product.name} style={{ width: '30px', height: '30px', cursor: 'pointer', margin: '0.2em' }} onClick={() => handleDelete(product.id)} />
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
    </div>
  );
};
