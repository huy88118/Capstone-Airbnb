import React from "react";

import BookingRoom from "./BookingRoom/BookingRoom";
import { useParams } from "react-router-dom";
import CommentRoom from "./CommentRoom/CommentRoom";
import styles from "./BookingRoom/BookingRoom.module.scss"

function Booking() {
  // const { maViTri } = useParams();
  const { id } = useParams();
  console.log(id);

  // console.log(maViTri);
  return (
    <div className={styles.bg}>
      <BookingRoom id={id} />
      <CommentRoom id={id}/>
     
    </div>
  );
}

export default Booking;
