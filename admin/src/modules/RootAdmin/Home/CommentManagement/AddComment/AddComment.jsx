import React,{ useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import Swal from "sweetalert2";

import commentsAPI from "../../../../../services/commentAPI";
import styles from "./AddComment.module.scss";
import { getRooms } from "../../../../../slices/roomSlice";
import Loading from "../../../../../components/Loading/Loading";

function AddComment() {
  const dispatch = useDispatch();

  const {rooms, loading } = useSelector(state => state.roomSlice);

  useEffect(() => {
    dispatch(getRooms());
  },[]);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      maPhong: "",
      maNguoiBinhLuan: "",
      ngayBinhLuan: "",
      noiDung: "",
      saoBinhLuan: 0,
    },
  });

  const { errors } = formState;

  const onSubmit = async (values) => {
    try {
      await commentsAPI.createComment(values);
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

  if(loading){
    return <Loading />
  }
  return (
    <div className={styles.wrapAddComments}>
    <div className={styles.headerAddComment}>
      <h4>ADDING COMMENT</h4>
    </div>
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <div className={styles.input}>
              <label>Room</label>
              <select
                type="text"
                {...register("maPhong", {
                  required: {
                    value: true,
                    message: "Room is required",
                  },
                })}
              > 
                <option value="">Select room</option>
                {
                  rooms.map(item => (
                    <option value={item.id} >{item.tenPhong}</option>
                  ))
                }
              </select>
              {errors.maPhong && (
                <p className={styles.txtError}>{errors.maPhong.message}</p>
              )}
            </div>
          </Col>
          <Col span={12}></Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Commentator code</label>
              <input
                type="text"
                {...register("maNguoiBinhLuan", {
                  required: {
                    value: true,
                    message: "Commentator code is required",
                  },
                  pattern: {
                    value: /^[1-9]|[0-9]{2,}$/,
                    message: "Commentator code is integer and greater than 0",
                  },
                })}
              />
              {errors.maNguoiBinhLuan && (
                <p className={styles.txtError}>
                  {errors.maNguoiBinhLuan.message}
                </p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Comment date</label>
              <input
                type="date"
                {...register("ngayBinhLuan", {
                  required: {
                    value: true,
                    message: "Comment date is required",
                  },
                })}
              />
              {errors.ngayBinhLuan && (
                <p className={styles.txtError}>
                  {errors.ngayBinhLuan.message}
                </p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Content comment</label>
              <input
                {...register("noiDung", {
                  required: {
                    value: true,
                    message: "Content comment is required",
                  },
                })}
              />
              {errors.noiDung && (
                <p className={styles.txtError}>{errors.noiDung.message}</p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Start comment</label>
              <input
                type="number"
                {...register("saoBinhLuan", {
                  required: {
                    value: true,
                    message: "Start comment is required and number",
                  },
                  pattern: {
                    value: /^[0-5]$/,
                    message: "Start is from 0 to 5",
                  },
                })}
              />
              {errors.saoBinhLuan && (
                <p className={styles.txtError}>
                  {errors.saoBinhLuan.message}
                </p>
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
export default AddComment