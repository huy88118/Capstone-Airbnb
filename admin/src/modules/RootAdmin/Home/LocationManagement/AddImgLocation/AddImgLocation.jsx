import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import locationsAPI from "../../../../../services/locationsAPI";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import styles from "./AddImgLocation.module.scss";
import { getLocations } from "../../../../../slices/locationSlice";
import { handleModalAddImgLocation } from "../../../../../slices/modalSlice";

function AddImgLocation({ idLocation }) {
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
      setImgPreview(null);
  },[idLocation])

  // useForm
  const { handleSubmit, reset, setValue } = useForm();

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

      await locationsAPI.uploadImgLocation(idLocation, formData);
      reset();
      setImgPreview(null);
      dispatch(getLocations());
      dispatch(handleModalAddImgLocation());
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

    setValue("formFile", file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  };

  return (
    <div className={styles.addImgLocation}>
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

export default AddImgLocation