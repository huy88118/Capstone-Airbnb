import React, { useState, useEffect } from "react";
// import {apiCommentRoom} from "../../../apis/locationAPI"
import { apiGetComment } from "../../../apis/locationAPI";
import styles from "./CommentRoom.module.scss"

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
    <div className={styles.comment}>
       <h2>Bình luận của khách hàng đã đến đây !</h2>
      {comments.map((item) => {
        if (item.maPhong.toString() === id) {
          return (
          <div className="col-sm-4">
               <div className={styles.binhLuan} key={item.maPhong}>
              
              <span className={styles.commentId}>Khách hàng<p className={styles.commentP}>{item.id}</p></span>
              <p>Nội dung : {item.noiDung}</p>
              <p >Ngày bình luận :{item.ngayBinhLuan}</p>
        </div>
          </div>   

         
          );
        }
      })}
    </div>
  );
}

export default CommentRoom;
