import React from "react";

import BookingRoom from "./BookingRoom/BookingRoom";
import { useParams } from "react-router-dom";

function Booking() {
  const { maViTri } = useParams();
  const { id } = useParams();
  console.log(id);

  console.log(maViTri);
  return (
    <div>
      <BookingRoom id={id} />
     
    </div>
  );
}

export default Booking;
