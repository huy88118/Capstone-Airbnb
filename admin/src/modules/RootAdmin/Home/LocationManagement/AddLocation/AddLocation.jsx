import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import Swal from "sweetalert2";

import locationsAPI from "../../../../../services/locationsAPI";
import styles from "./AddLocation.module.scss";

function AddLocation()  {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
  });

  const { errors } = formState;

  const onSubmit = async (values) => {
    try {
      await locationsAPI.createLocation(values);
      reset();
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

  return (
    <div className={styles.wrapAddLocation}>
    <div className={styles.headerAddLocation}>
      <h4>ADDING LOCATION</h4>
    </div>
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[20, 20]}>
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
        </Row>
        <div className={styles.btn}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  </div>
);
};
export default AddLocation