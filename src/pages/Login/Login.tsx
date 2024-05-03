
import { useState } from "react";
import { decodeToken } from "react-jwt";
import "./Login.css"
import { DataFetched2, LoginData } from "../../interfaces";
import { LoginMe, Notification } from "../../services/apiCalls";
import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateNotification } from "../../app/slices/notificationSlice";
import { CInput1 } from "../../common/CInput1/CInput1";

export const Login: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<LoginData>({
    email: "",
    password: ""
  })

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const logeame = async (): Promise<void> => {

    const fetched = await LoginMe(credentials);

    if (fetched.token) {
      const decodificado = decodeToken(fetched.token);

      const passport = {
        token: fetched.token,
        user: decodificado,
      };
      dispatch(login({ credentials: passport }));

      const fetched2: DataFetched2 = await Notification(passport.token);
      if (fetched2.data[0].length === 0 && fetched2.data[1].length === 0) {
        dispatch(updateNotification({ notification: false }));
      } else {
        dispatch(updateNotification({ notification: true }));
      }
      navigate("/")

    }

  }

  return (
    <>
      <div className="categoryTitle33">
        LOGIN
      </div>
      <div className="login">
        <div className="loginInputs">
          <CInput1
            className="inputLogin"
            type={"email"}
            name={"email"}
            value={credentials.email || ""}
            placeholder={"write your email..."}
            onChange={inputHandler}
          />
          <CInput1
            className="inputLogin"
            type={"password"}
            name={"password"}
            value={credentials.password || ""}
            placeholder={"write your password..."}
            onChange={inputHandler}
          />
          <button className="buttonLogin" onClick={logeame}>LOG ME!</button>
        </div>
      </div>
    </>);
};
