
import { useState } from "react";
import "./Register.css"
import {  RegisterData } from "../../interfaces";
import { RegisterMe } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { CInput4 } from "../../common/CInput4/CInput4";
import { validame } from "../../utils/functions";

export const Register: React.FC = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<RegisterData>({
    name: "",
    lastName: "",
    city: "",
    email: "",
    password: ""
  })

  const [userError, setUserError] = useState({
    nameError: "",
    lastNameError: "",
    cityError: "",
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

    const fetched = await RegisterMe(credentials);

    console.log(fetched, "fetched")

    navigate("/login")



  }

  return (
    <>
      <div className="categoryTitle33">
        REGISTER
      </div>
      <div className="register">
        <div className="loginInputs2">
          <div className="loginText">
            Fill the data
          </div>
          <div className="titleInput">NAME</div>
          <CInput4
            className={`inputLogin ${userError.nameError !== "" ? "inputDesignError" : ""}`}
            type={"text"}
            name={"name"}
            value={credentials.name || ""}
            placeholder={"write your email..."}
            onChange={inputHandler}
            onBlur={checkError}
          />
          <div className="errorHeader">{userError.nameError}</div>
          <div className="titleInput">LASTNAME</div>
          <CInput4
            className={`inputLogin ${userError.lastNameError !== "" ? "inputDesignError" : ""}`}
            type={"text"}
            name={"lastName"}
            value={credentials.lastName || ""}
            placeholder={"write your password..."}
            onChange={inputHandler}
            onBlur={checkError}
          />
          <div className="errorHeader">{userError.lastNameError}</div>
          <div className="titleInput">CITY</div>
          <CInput4
            className={`inputLogin ${userError.cityError !== "" ? "inputDesignError" : ""}`}
            type={"text"}
            name={"city"}
            value={credentials.city || ""}
            placeholder={"write your password..."}
            onChange={inputHandler}
            onBlur={checkError}
          />
          <div className="errorHeader">{userError.cityError}</div>
          <div className="titleInput">EMAIL</div>
          <CInput4
            className={`inputLogin ${userError.emailError !== "" ? "inputDesignError" : ""}`}
            type={"email"}
            name={"email"}
            value={credentials.email || ""}
            placeholder={"write your email..."}
            onChange={inputHandler}
            onBlur={checkError}
          />
          <div className="errorHeader">{userError.passwordError}</div>
          <div className="titleInput">PASSWORD</div>
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
        </div>
      </div>
    </>);
};
