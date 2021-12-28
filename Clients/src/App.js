import Login from "./components/login/Login";
import { useContext } from "react";
import Register from "./components/register/Register";
import Setting from "./components/setting/Setting";
import Topbar from "./components/topbar/Topbar";
import "./components/topbar/Topbar.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Single from "./pages/single/Single";
import NOuserSinglePost from "./components/NouserSinglePost/NOuserSinglePost";
import { Context } from "./components/context/context";
import Postsholder from "./components/Postholder/Postsholder";
import PostIds from "./components/postIds/PostIds";

function App() {
  const { user } = useContext(Context);

  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single" element={<Postsholder />} />
        <Route
          path="/single/:id"
          element={user ? <Single /> : <NOuserSinglePost />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postId/:id" element={<PostIds />} />
        <Route path="/setting" element={user ? <Setting /> : <Register />} />
      </Routes>
    </>
  );
}

export default App;
