import React, { useState, useEffect } from "react";
import axiosCall from "../../Axios";
import Post from "../post/Post";

export default function Postsholder() {
  const [post, setPost] = useState(null);
  let searchCss = {
    padding: "10px",
    width: "50%",
    fontSize: "1.3rem",
    letterSpacing: "1.3px",
    outline: "none",
    marginLeft: "70px",
    display: "block  ",
    position:"sticky",
    margin: "20px ",
  };
  let postHolderDivCss = {
    width: "70vw",
    height: "95vh",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flex: "9",
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axiosCall.get("/posts");
      setPost(request.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <input
        type="text"
        name="search"
        style={searchCss}
        id="search"
        placeholder="Search Blog"
      />
      <div
        className="postHolderWrapper"
        style={{ display: "flex", marginTop: "40px" }}
      >
        <div className="postHolderDiv" style={postHolderDivCss}>
          {post === null ? (
            <h2>loading</h2>
          ) : (
            post.map((val, index) => {
              return (
                <>
                  <Post val={val} key={index} />
                </>
              );
            })
          )}
        </div>

      </div>
    </>
  );
}
