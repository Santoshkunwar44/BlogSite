import React from 'react'
import { useLocation } from "react-router";
import { useEffect, useState, useContext } from "react";
import Post from "../post/Post";
import axiosCall from "../../Axios";
import Singlepost from '../SinglePost/Singlepost';
function PostIds() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState();
  console.log(path)
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const res = await axiosCall.get("/posts/" + path);
          setPost(res.data);
          console.log(res.data)
        } catch (err) {
          console.log(err.response.data);
        }
      };
      fetchPost();
    }, [path]);
  
    return (
        <>
      <div className="postIdWrapper">
        {
          post===undefined ? <h2>loading</h2> :   window.location.replace("/single/"+path)         }
   
      </div>
    </>
    )
}

export default PostIds
