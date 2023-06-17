import React from "react";
import RoomInfo from "./Roominfo/RoomInfo";
import ShowRoom from "./ShowRoom/ShowRoom";
import { useParams } from "react-router-dom";

function RoomDetails() {
  const { maViTri } = useParams();
  const { id } = useParams();
  console.log(id);

  console.log(maViTri);
  return (
    <div>
      <ShowRoom id={maViTri} />
      <RoomInfo maViTri={maViTri} />
    </div>
  );
}

export default RoomDetails;
