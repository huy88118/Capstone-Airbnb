import React, { useState, useEffect } from "react";
// import {apiCommentRoom} from "../../../apis/locationAPI"
import { apiGetComment } from "../../../apis/locationAPI";

function CommentRoom({ id }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const getComments = async () => {
    try {
      const data = await apiGetComment();
      console.log(data);
      setComments(data.content);
    } catch (error) {
      setError(error.response?.data?.content);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  if (error) return null;
  return (
    <div>
      {comments.map((item) => {
        if (item.maPhong.toString() === id) {
          return (
            <div>
              <p key={item.maPhong}>Nội dung: {item.noiDung}</p>
            </div>
          );
        }
      })}
    </div>
  );
}

export default CommentRoom;
