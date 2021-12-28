import "./register.css";
import { useState, useEffect } from "react";
import axiosCall from "../../Axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");
  const [error, setError] = useState(false);
  const [showPwd, setshowPwd] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);

  useEffect(() => {
    let length = password.length;
    setPasswordLength(length);

  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userlength =username.length;
    if (!userlength <3) {

      try {
        const res = await axiosCall.post("/auth/register", {
          username,
          email,
          password,
        });
        // res.data && window.location.replace("/login");
      } catch (err) {
   
        setError(true);
      }
    } else {
      setmessage("Username should have more than 3 letters");
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <span className="registerTitle">Register</span>
        <span
          style={{ display: message === "" ? "none" : "block" }}
          className="errorMsg"
        >
          {message}
        </span>

        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Username"
            autoFocus="true"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            className="registerInput"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            type={showPwd ? "text " : "password"}
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

          <button type="submit" className="registerButton">
            Register
          </button>
        </form>
        <button className="registerRegisterButton">
          <Link to="/login">Login</Link>
        </button>

        {error && <span className="errorMsg">SOMETHING WENT WRONG</span>}
      </div>
    </div>
  );
}
