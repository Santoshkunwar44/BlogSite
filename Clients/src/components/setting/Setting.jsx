import { Context } from "../context/context";
import Sidebar from "../sidebar/Sidebar";
import { useContext, useState } from "react";
import axiosCall from "../../Axios";
import "./setting.css";

export default function Setting() {
  const PF = "http://localhost:8000/images/";
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      try {
        await axiosCall.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axiosCall.put("/users/" + user._id, updatedUser);
      if (res.data) {
        setEmail("");
        setUsername("");
        setPassword("");
        setSuccess(true);
        setUpdateMode(false)
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      }
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(err.response.data.errorMsg);
    }
  };
  const deleteAccount = async () => {
    const will_Delete = prompt("Type CONFIRM To Delete Account");
    if (will_Delete === "CONFIRM") {
      try {
        const res = await axiosCall.delete("/users/" + user._id, {
          data: { userId: user._id },
        });

        dispatch({ type: "LOG_OUT" });
        res.data && window.location.replace("/");
      } catch (err) {}
    }
  };

  const updateAccount = () => {
    setUpdateMode(true);
  };

  const changeProfile = () => {};

  const updateModeCss = {
    outline: "2px solid #2980b9",
    borderRadius: "5px",
  };
  return (
    <div className="setting">
      <div className="settingWrapper">
        <form action="" className="settingForm" onSubmit={handleUpdate}>
          <i
            onClick={() => {
              setShow(!show);
            }}
            className="settingIcon fas fa-ellipsis-v"
          ></i>
          <div className="setProfile">
            <ul
              className="showSetting"
              style={{ display: show ? "block" : "none" }}
            >
              <li className="settingLi" onClick={updateAccount}>
                UPDATE ACCOUT
              </li>
              <li className="settingLi" onClick={deleteAccount}>
                DELETE ACCOUNT
              </li>
              <li className="settingLi" onClick={changeProfile}>
                <label htmlFor="fileInput">CHANGE PROFILE PICTURE</label>
              </li>
            </ul>
          </div>
          <label className="profilePicture_text">Profile Picture</label>
          <div className="settingPP">
            <img
              className="profilePicture"
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
            />

            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label>UserName</label>
            <input
              type="text"
              placeholder={user.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={updateMode ? updateModeCss : null}
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              style={updateMode ? updateModeCss : null}
              required
            />
            <label>Password</label>
            <input
              type="text"
              value={password}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              style={updateMode ? updateModeCss : null}
            />
            {updateMode && (
              <>
                <div className="btnWrapper">
                  <button type="submit" className="settingSubmit">
                    UPDATE
                  </button>
                  <button
                    onClick={() => setUpdateMode(false)}
                    type="submit"
                    className="settingSubmit"
                  >
                    CANCEL
                  </button>
                </div>
              </>
            )}
            {success && (
              <span style={{ color: "green" }}>PROFILE HAS BEEN UPDATED</span>
            )}
          </div>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
