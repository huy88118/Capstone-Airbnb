
import React, { useState, useEffect } from "react";
// import {apiCommentRoom} from "../../../apis/locationAPI"
import {apiGetComment} from "../../../apis/locationAPI"


function CommentRoom({maPhong}) {
    const [comments, setComments] = useState([]);

    const getComments = async () => {
      try {
        const data = await apiGetComment();
        console.log(data);
        setComments(data.content);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
        getComments();
    }, []);
  return (
    <div>
    {comments.map((item) => {
      if (item.maPhong === maPhong) {
        return (
          <div >
         
           <p key={item.maPhong}>Nội dung: {item.noiDung}</p>
          </div>
        );
      }
    })}
  </div>
  )
}

export default CommentRoom