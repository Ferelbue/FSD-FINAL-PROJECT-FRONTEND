
import { BringAllUsers, BringAllUsersNumber, DeleteUserById, EditUserRole, Notification } from "../../services/apiCalls";
import { DataFetched2, UserUpdateRole } from "../../interfaces";
import { useEffect, useState } from "react";
import "./AdminUsers.css";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { updateNotification } from "../../app/slices/notificationSlice";
import { ROOT2 } from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { searchData2, updateCriteria2 } from "../../app/slices/search2Slice";
import { Pagination } from "react-bootstrap";
import { CInput3 } from "../../common/CInput3/CInput3";

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<any>("");
  const dispatch = useDispatch();
  const searchRdx2 = useSelector(searchData2);
  const rdxUser = useSelector(userData);
  const [criteria2, setCriteria2] = useState("")
  const [nameCriteria2, setNameCriteria2] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPag, setMaxPag] = useState(0);
  const [editRole, setEditRole] = useState<Record<string, boolean>>({});

  const [userRole, setUserRole] = useState<UserUpdateRole>({
    role: ""
  })

  const inputHandler2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRole((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(userRole, "userRole");
  }


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

      console.log(currentPage, "searchRdx2.criteria");
      const fetched: DataFetched2 = await BringAllUsers(rdxUser.credentials.token, searchRdx2.criteria, currentPage);
      const fetched2: DataFetched2 = await BringAllUsersNumber(rdxUser.credentials.token);

      console.log(fetched.data, "fetched");

      setUsers(fetched.data);
      setMaxPag(Math.ceil(fetched2.data.length / 10))

      if (error) {
        console.log(error, "error");
      }


    };
    bringData();

  }, [searchRdx2.criteria, currentPage]);

  const handleDelete = async (userId: number) => {
    try {
      await DeleteUserById(rdxUser.credentials.token, userId);
      const fetched: DataFetched2 = await BringAllUsers(rdxUser.credentials.token, "", currentPage);
      setUsers(fetched.data);
    } catch (error) {
      setError(error);
      console.log(error, "error")
    }
  };

  const handleEditRole = async (userId: number) => {
    console.log(userId, "userId")
    setEditRole({
      ...editRole,
      [userId]: true
    });
  }

  const handleSendEditRole = async (userId: number) => {
    try {
      await EditUserRole(rdxUser.credentials.token, userId, userRole.role);
      setEditRole({
        ...editRole,
        [userId]: false
      });
      const fetched: DataFetched2 = await BringAllUsers(rdxUser.credentials.token, "", currentPage);
      setUsers(fetched.data);

    } catch (error) {
      setError(error);
      console.log(error, "error")
    }
  }
  console.log(rdxUser.credentials.user.roleName, "rdxUser.credentials.userRole")

  return (
    <div className="category">

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
      {users ? (
        <>
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
                    <td>
                      <CInput3
                        className={editRole[user.id] ? "inputProfile5" : "inputProfile6"}
                        type="text"
                        name="role"
                        placeholder="USER ADMIN SUPER-ADMIN"
                        disabled={!editRole[user.id]}
                        value={editRole[user.id] ? userRole.role || "" : user.role.name}
                        onChange={(e) => inputHandler2(e)}
                      />
                    </td>
                    <td>
                      {rdxUser.credentials.user.roleName === "super-admin"
                        ? (
                          editRole[user.id]
                            ? (
                              <>
                                <img src={`${ROOT2}uploads/tick.png`} alt={user.name} style={{ width: '30px', height: '30px', cursor: 'pointer', margin: '0.2em' }} onClick={() => handleSendEditRole(user.id)} />
                                <img src={`${ROOT2}uploads/pencil.png`} alt={user.name} style={{ width: '25px', height: '25px', cursor: 'pointer', margin: '0.2em' }} onClick={() => handleEditRole(user.id)} />
                                <img src={`${ROOT2}uploads/pot.png`} alt={user.name} style={{ width: '30px', height: '30px', cursor: 'pointer', margin: '0.2em' }} onClick={() => handleDelete(user.id)} />
                              </>
                            )
                            : (
                              <>
                                <img src={`${ROOT2}uploads/pencil.png`} alt={user.name} style={{ width: '25px', height: '25px', cursor: 'pointer', margin: '0.2em' }} onClick={() => handleEditRole(user.id)} />
                                <img src={`${ROOT2}uploads/pot.png`} alt={user.name} style={{ width: '30px', height: '30px', cursor: 'pointer', margin: '0.2em' }} onClick={() => handleDelete(user.id)} />
                              </>
                            )
                        )
                        : (
                          <img src={`${ROOT2}uploads/pot.png`} alt={user.name} style={{ width: '30px', height: '30px', cursor: 'pointer', margin: '0.2em' }} onClick={() => handleDelete(user.id)} />
                        )
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
        <div className="cardProduct33">Any user found...</div>
      )
      }
    </div >
  );
};
