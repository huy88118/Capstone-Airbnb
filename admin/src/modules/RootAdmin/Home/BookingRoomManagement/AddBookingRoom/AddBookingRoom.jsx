import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import bookingRoomAPI from "../../../../../services/bookingRoomAPI";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../../components/Loading/Loading";
import styles from "./AddBooking.module.scss";
import { getRooms } from "../../../../../slices/roomSlice";

function AddBookingRoom() {
  const dispatch = useDispatch();

  const { rooms, loading } = useSelector((state) => state.roomSlice);

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      maPhong: 0,
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: 0,
      maNguoiDung: 0,
    },
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = async (values) => {
    try {
      await bookingRoomAPI.createBooking(values);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapAddBooking}>
    <div className={styles.headerAddBooking}>
      <h4>ADDING BOOKING ROOM</h4>
    </div>
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <div className={styles.input}>
              <label>Room </label>
              <select
              placeholder="Select room"
                {...register("maPhong", {
                  required: {
                    value: true,
                    message: "Room name is required",
                  },
                })}
              >
                <option value="" >Select room</option>
                {rooms.map((item) => (
                  <option value={item.id}>{item.tenPhong}</option>
                ))}
              </select>

              {errors.maPhong && (
                <p className={styles.txtError}>{errors.maPhong.message}</p>
              )}
            </div>
          </Col>
          <Col span={12}></Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Start date</label>
              <input
                type="date"
                {...register("ngayDen", {
                  required: {
                    value: true,
                    message: "Start date is required",
                  },
                })}
              />
              {errors.ngayDen && (
                <p className={styles.txtError}>{errors.ngayDen.message}</p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>End date</label>
              <input
                type="date"
                {...register("ngayDi", {
                  required: {
                    value: true,
                    message: "End date is required",
                  },
                })}
              />
              {errors.ngayDi && (
                <p className={styles.txtError}>{errors.ngayDi.message}</p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>Amount user</label>
              <input
                type="number"
                {...register("soLuongKhach", {
                  required: {
                    value: true,
                    message: "The number of customer is required",
                  },
                  pattern: {
                    value: /^[1-9]|[0-9]{2,}$/,
                    message: "Amount user is integer and greater than 0",
                  },
                })}
              />
              {errors.soLuongKhach && (
                <p className={styles.txtError}>
                  {errors.soLuongKhach.message}
                </p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.input}>
              <label>User code</label>
              <input
                type="number"
                {...register("maNguoiDung", {
                  required: {
                    value: true,
                    message: "User code is required",
                  },
                  pattern: {
                    value: /^[1-9]|[0-9]{2,}$/,
                    message: "User code is integer and greater than 0",
                  },
                })}
              />
              {errors.maNguoiDung && (
                <p className={styles.txtError}>
                  {errors.maNguoiDung.message}
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

export default AddBookingRoom