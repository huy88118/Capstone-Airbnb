import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import Swal from "sweetalert2";

import styles from "./EditLocation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import locationsAPI from "../../../../../services/locationsAPI";
import { getLocations } from "../../../../../slices/locationSlice";
import { handleModalEditLocation } from "../../../../../slices/modalSlice";

function EditLocation() {
  const dispatch = useDispatch();
const { location } = useSelector((state) => state.modalSlice);

const [idLocation, setIdLocation] = useState(null);

const { register, handleSubmit, formState, reset, setValue, getValues } =
  useForm({
    defaultValues: {
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
  });

const { errors } = formState;

useEffect(() => {
  setIdLocation(location?.id);
  for (let key in location) {
    setValue(key, location[key]);
  }
}, [location]);

const onSubmit = async (values) => {
  try {
    await locationsAPI.updateLocation(idLocation, values);
    reset();
    dispatch(getLocations());
    dispatch(handleModalEditLocation());
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

const handleDeleteImgLocation = () => {
  if (!getValues("hinhAnh")) return;
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      setValue("hinhAnh", "");
    }
  });
};
  return (
    <div className={styles.formEditLocation}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <div className={styles.input}>
              <label>ID location</label>
              <input defaultValue={idLocation} disabled />
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Location name</label>
              <input
                {...register("tenViTri", {
                  required: {
                    value: true,
                    message: "Location name is required",
                  },
                })}
              />
              {errors.tenViTri && (
                <p className={styles.txtError}>{errors.tenViTri.message}</p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Province name</label>
              <input
                {...register("tinhThanh", {
                  required: {
                    value: true,
                    message: "Province name is required",
                  },
                })}
              />
              {errors.tinhThanh && (
                <p className={styles.txtError}>{errors.tinhThanh.message}</p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Country name</label>
              <input
                {...register("quocGia", {
                  required: {
                    value: true,
                    message: "Country name is required",
                  },
                })}
              />
              {errors.quocGia && (
                <p className={styles.txtError}>{errors.quocGia.message}</p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Image</label>
              <input disabled {...register("hinhAnh")} />
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.btnDeleteImgLocation}>
              <button type="button" onClick={handleDeleteImgLocation}>
                Delete image
              </button>
            </div>
          </Col>
        </Row>
        <div className={styles.btn}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditLocation