
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import "./Login.css"
import { DataFetched2, LoginData } from "../../interfaces";
import { LoginMe, Notification } from "../../services/apiCalls";
import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateNotification } from "../../app/slices/notificationSlice";
import { CInput4 } from "../../common/CInput4/CInput4";
import { validame } from "../../utils/functions";
import { Spinner } from "react-bootstrap";

export const Login: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [credentials, setCredentials] = useState<LoginData>({
    email: "",
    password: ""
  })

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const checkError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const error = validame(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  return (
    <>
      <div className="categoryTitle33">
        LOGIN
      </div>
      {isLoading ? (
        <div className="login2">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <div className="login">
          <div className="loginInputs">
            <div className="loginText">
              Welcome back!
            </div>
            <CInput4
              className={`inputLogin ${userError.emailError !== "" ? "inputDesignError" : ""}`}
              type={"email"}
              name={"email"}
              value={credentials.email || ""}
              placeholder={"write your email..."}
              onChange={inputHandler}
              onBlur={checkError}
            />
            <div className="errorHeader">{userError.emailError}</div>
            <CInput4
              className={`inputLogin ${userError.passwordError !== "" ? "inputDesignError" : ""}`}
              type={"password"}
              name={"password"}
              value={credentials.password || ""}
              placeholder={"write your password..."}
              onChange={inputHandler}
              onBlur={checkError}
            />
            <div className="errorHeader">{userError.passwordError}</div>
            <button className="buttonLogin" onClick={logeame}>LOG ME!</button>
            <div className="loginText2">
              Not registered yet? <a href="/register">Register here</a>
            </div>
          </div>
        </div>
      )}

    </>);
};
