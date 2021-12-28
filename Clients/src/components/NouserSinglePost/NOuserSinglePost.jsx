import "./NOuserSinglePost.css";

import axiosCall from "../../Axios";
import { useLocation } from "react-router";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/context";
export default function Singlepost() {
  const { user } = useContext(Context);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = "http://localhost:8000/images/";

  useEffect(() => {
    const fetchPost = async () => {
      const request = await axiosCall.get("posts/" + path);
      setPost(request.data);
      setTitle(request.data.title);
      setDesc(request.data.desc);
    };
    fetchPost();
  }, [path]);

  const handleUpdate = async () => {
    try {
      await axiosCall.put(`posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });

      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
  
      <div className="singPostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author :
            <Link to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            type="text"
            value={desc}
            className="singlePostDescInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode ? (
          <button className="singPostUpdateBtn" onClick={handleUpdate}>
            UPDATE
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
