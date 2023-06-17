import React,{ useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import roomAPI from '../../../../../services/RoomAPI';

import styles from "./AddImgRoom.module.scss";
import { handleModalAddImgRoom } from '../../../../../slices/modalSlice';
import { getRooms } from '../../../../../slices/roomSlice';

function AddImgRoom({idRoom}) {
  const dispatch = useDispatch();

const [imgPreview, setImgPreview] = useState(null);
  console.log(idRoom)


// useForm
const { handleSubmit, setValue, reset } = useForm({
  defaultValues: { formFile: "" },
  mode: "onTouched",
});

useEffect(() => {
  setImgPreview(null);

},[idRoom])

const onSubmit = async (values) => {
  try {
    if(!imgPreview) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out the image file!',
        })
      return;
  }
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    await roomAPI.uploadImgRoom(idRoom, formData);

    reset();

    dispatch(handleModalAddImgRoom());
    dispatch(getRooms());
    setImgPreview(null);
    Swal.fire({
      title: "Success!",
      text: "Congratulations on your successful",
      icon: "success",
      confirmButtonText: "Close",
    });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error}`,
      icon: "error",
      confirmButtonText: "Close",
    });
  }
};

const handleImg = (evt) => {
  const file = evt.target.files[0];

  if (!file) return;

  setValue("formFile", file);

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (evt) => {
    setImgPreview(evt.target.result);
  };
};
  return (
    <div className={styles.addImgRoom}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" onChange={handleImg} />
      <button className={styles.btnImgPreview}>Submit</button>
    </form>

    <div className={styles.imgPreview}>
      {imgPreview && <img src={imgPreview} alt="imgPreview" />}
    </div>
  </div>
  );
};

export default AddImgRoom