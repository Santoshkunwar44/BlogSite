import { Context } from "../context/context";
import axiosCall from "../../Axios";
import { useRef, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [showPwd, setshowPwd] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");
  const [passwordLength, setPasswordLength] = useState(0);
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  

  useEffect(() => {
    const changedLength = password.length;
    setPasswordLength(changedLength);
  }, [password,passwordLength]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosCall.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/");
      console.log(res);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setmessage(err.response.data.errorMsg)

    }
  };

  // console.log(userRef.current.value,passwordRef.current.value)
  return (
    <div className="login">
      <div className="loginWrapper">
        <span className="loginTitle">Login</span>
        <span className="errorMsg" style={{display:message==="" ? "none": "block" }}>{message}</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Username"
            ref={userRef}
            required
          />
          <label>Password</label>
          <input
            className="loginInput"
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordLength >= 1 ? (
            showPwd ? (
              <i
                onClick={() => setshowPwd(!showPwd)}
                className=" show_hidePassword fas fa-eye"
              ></i>
            ) : (
              <i
                onClick={() => setshowPwd(!showPwd)}
                className=" show_hidePassword fas fa-eye-slash"
              ></i>
            )
          ) : null}
          <button className="loginButton" disabled={isFetching}>
            Login
          </button>
        </form>
        <Link to="/register">
          <button
            className="loginRegisterButton"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
