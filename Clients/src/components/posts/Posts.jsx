import Post from "../post/Post";
import "./Posts.css";

export default function Posts({ postes }) {
  return (
    <>
      <div className="posts">
        {postes.map((arr, index) => (
          <Post val={arr} key={index} />
        ))}
      </div>
    </>
  );
}
