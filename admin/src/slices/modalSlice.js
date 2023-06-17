import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalEditUser: false,
  modalEditRoom: false,
  modalAddImgRoom: false,
  modalCommentsRoom : false,
  modalEditBooking: false,
  bookingRoom: null,
  modalEditLocation: false,
  location: null,
  modalAddImgLocation: false,
  
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleModalEditUser: (state, action) => {
      return { ...state, modalEditUser: !state.modalEditUser };
    },
    handleModalEditRoom: (state, action) => {
      return { ...state, modalEditRoom: !state.modalEditRoom };
    },
    handleModalAddImgRoom: (state, action) => {
      return { ...state, modalAddImgRoom: !state.modalAddImgRoom };
    },
    handleModalCommentsRoom : (state,action) => {
      return {...state, modalCommentsRoom: !state.modalCommentsRoom};
    },
    handleModalEditBooking: (state, action) => {
      return { ...state, modalEditBooking: !state.modalEditBooking, bookingRoom: action.payload };
    },
    handleModalEditLocation: (state,action) => {
      return {...state, modalEditLocation: !state.modalEditLocation, location: action.payload};
    },
    handleModalAddImgLocation: (state,action) => {
      return {...state, modalAddImgLocation: !state.modalAddImgLocation};
    },
    

  },
});

export const {
  handleModalEditUser,
  handleModalEditRoom,
  handleModalAddImgRoom,
  handleModalEditBooking,
  handleModalEditLocation,
  handleModalAddImgLocation,
  handleModalCommentsRoom,
} = modalSlice.actions;

export default modalSlice.reducer;