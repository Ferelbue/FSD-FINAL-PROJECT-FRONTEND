
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { decodeToken } from "react-jwt";
import "./Login.css"
import { DataFetched2, LoginData } from "../../interfaces";
import { LoginMe, Notification } from "../../services/apiCalls";
import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProductDetail } from "../../app/slices/productDetailSlice";
import { updateNotification } from "../../app/slices/notificationSlice";

export const Login: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<LoginData>({
    email: "",
    password: ""
  })
  
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setCredentials((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value
    }))
  }

  const logeame = async ():Promise<void> => {

    const fetched = await LoginMe(credentials);

    if (fetched.token) {
      const decodificado = decodeToken(fetched.token);

      const passport = {
        token: fetched.token,
        user: decodificado,
      };
      dispatch(login({ credentials: passport }));
      
      const fetched2: DataFetched2 = await Notification(passport.token);
      if(fetched2.data[0].length === 0 && fetched2.data[1].length === 0){
        dispatch(updateNotification({ notification:false}));
      }else{ 
        dispatch(updateNotification({ notification:true}));
      }
      navigate("/")

    }
  
 }

  return (
  <div>
    <CInput 
        type={"email"}
        name={"email"}
        value={credentials.email || ""}
        placeholder={""}
        onChange={inputHandler}
    />
    <CInput 
        type={"password"}
        name={"password"}
        value={credentials.password || ""}
        placeholder={""}
        onChange={inputHandler}
    />
    <button onClick={logeame}>LOG ME!</button>
  </div>);
};
