import axiosClient from "./axiosClient";
// dua vao phan bao tri va cap nhap , minh hok co thu vien axios chuyen het axios cu sang moi callAPi khac neu use truc tiep trong component check source code kiem tra hoat dong dugn hok trong component cho khac se xai ham , di dung folder api client thay the thang moi , di vao tunwg thang hang o noi khac ko quan tam ruot thay doi no
export const apiSignin = async (values) => {
  const { data } = await axiosClient.post("/auth/signin", values);
  return data;
};

// export const apiSignup = async (values) => {
//   const { data } = await axiosClient.post("/QuanLyNguoiDung/DangKy", values);
//   return data;
// };


export const apiSignup = async (values) => {
  const { data } = await axiosClient.post("/auth/signup", values);
  return data;
};




// export const apiAddUser = async (values) => {
//   values = { ...values };

//   await axiosClient.post('/QuanLyNguoiDung/ThemNguoiDung', values);
// }
