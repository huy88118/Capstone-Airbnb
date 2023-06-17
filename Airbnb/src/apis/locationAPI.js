import axiosClient from "./axiosClient";

export const apiGetLocations = async () => {
  const { data } = await axiosClient.get("/vi-tri");
  return data;
};

export const apiGetRoomDetails = async (maViTri) => {
  const { data } = await axiosClient.get("/phong-thue/lay-phong-theo-vi-tri", {
    params: {
      maViTri: maViTri,
    },
  });

  return data;
};

export const apiGetBookingInfo = async (id) => {
  const { data } = await axiosClient.get("/phong-thue/", {
    params: {
      id: id,
    },
  });

  return data;
};

export const apiGetComment = async () => {
  const { data } = await axiosClient.get("/binh-luan");
  return data;
};

// export const apiCommentRoom = async (MaPhong) => {
//   const { data } = await axiosClient.get("/binh-luan/lay-binh-luan-theo-phong/", {
//     params: {
//   MaPhong:MaPhong,
//     },
//   });

//   return data;
// };
