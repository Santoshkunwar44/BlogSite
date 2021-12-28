import "./Post.css";
import { Link } from "react-router-dom";

export default function Post({ val }) {
  const PF = "http://localhost:8000/images/";

  return (
    <>
      <div className="post">
        {val.photo && <img src={PF + val.photo} alt="" className="postImg" />}
        <div className="postInfo">
          <div className="postCats">
            {val.categories.map((e) => (
              <span className="postCat">{e.name}</span>
            ))}
          </div>
          <Link to={`/single/${val._id}`}>
            <span className="postTitle"> {val.title}</span>
          </Link>

          <hr />
          <span className="postDate">
            {new Date(val.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc"> {val.desc}</p>
      </div>
    </>
  );
}
