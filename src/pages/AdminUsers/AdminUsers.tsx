
import { BringAllUsers, DeleteUserById, Notification } from "../../services/apiCalls";
import { DataFetched2 } from "../../interfaces";
import { useEffect, useState } from "react";
import "./AdminUsers.css";
import { categoryData } from "../../app/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { updateNotification } from "../../app/slices/notificationSlice";
import { ROOT2 } from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { searchData2, updateCriteria2 } from "../../app/slices/search2Slice";

export const AdminUsers: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<any>("");
  const dispatch = useDispatch();
  const searchRdx2 = useSelector(searchData2);
  const rdxCategory = useSelector(categoryData);
  const rdxUser = useSelector(userData);
  const [criteria2, setCriteria2] = useState("")
  const [nameCriteria2, setNameCriteria2] = useState("")
  const [currentPage, setCurrentPage] = useState(1);

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


      const fetched: DataFetched2 = await BringAllUsers(rdxUser.credentials.token, searchRdx2.criteria);
      setUsers(fetched.data);

      if (error) {
        console.log(error, "error");
      }


    };
    bringData();

  }, [searchRdx2.criteria]);

  const handleDelete = async (userId: number) => {
    try {
      await DeleteUserById(rdxUser.credentials.token, userId);
      const fetched: DataFetched2 = await BringAllUsers(rdxUser.credentials.token, "");
      setUsers(fetched.data);
    } catch (error) {
      setError(error);
      console.log(error, "error")
    }
  };


  console.log(searchRdx2.criteria, "produsdcts");

  return (
    <div className="category">
      {users ? (
        <>
          <div className="categoryTitle3">
            <div className="categoryTitle37">
              ADMIN USERS
            </div>
            <div>
              <div className="inputHeader">
                <CustomInput
                  className={`inputSearch2`}
                  type="text"
                  placeholder="search a user...."
                  name="user"
                  disabled={false}
                  value={criteria2 || ""}
                  onChange={(e: any) => searchHandler(e)}
                />
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id}>
                    <td><img src={`${ROOT2}uploads/${user.image}`} alt={user.name} style={{ width: '50px', height: '50px' }} /></td>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.city}</td>
                    <td>{user.role.name}</td>
                    <td><img src={`${ROOT2}uploads/pot.png`} alt={user.name} style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => handleDelete(user.id)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
            <span>Página {currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === 5}>Siguiente</button>
          </div>
        </>
      ) : (
        <div>Cargando producto...</div>
      )}
    </div>
  );
};
