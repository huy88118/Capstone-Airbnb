import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Col, Row } from "antd";
import { useState } from "react";
import bookingRoomAPI from "../../../../../services/bookingRoomAPI";

import styles from "./EditBooking.module.scss";
import { getBookingRooms } from "../../../../../slices/bookingRoomSlice";
import { handleModalEditBooking } from "../../../../../slices/modalSlice";
import { getRooms } from "../../../../../slices/roomSlice";
import Loading from "../../../../../components/Loading/Loading";

function EditBooking() {
  const dispatch = useDispatch();
const { bookingRoom } = useSelector((state) => state.modalSlice);
const { rooms, loading } = useSelector((state) => state.roomSlice);

const [idBooking, setIdBooking] = useState(null);

useEffect(() => {
  setIdBooking(bookingRoom?.id);
},[bookingRoom]);

useEffect(() => {
  dispatch(getRooms());
},[])

// Form
const { register, handleSubmit, formState, setValue } = useForm({
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

useEffect(() => {
  for (let key in bookingRoom) {
    setValue(key, bookingRoom[key]);
  }
}, [bookingRoom]);

const onSubmit = async (values) => {
  try {
      console.log(values);
      console.log(idBooking);
    await bookingRoomAPI.updateBooking(idBooking, values)
    dispatch(getBookingRooms());
    dispatch(handleModalEditBooking());
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
    <div className={styles.formEditBooking}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <div className={styles.input}>
            <label>ID Booking</label>
            <input disabled defaultValue={idBooking} />
          </div>
        </Col>
        <Col span={12}>
        <div className={styles.input}>
              <label>Room</label>
              <select
                {...register("maPhong", {
                  required: {
                    value: true,
                    message: "Room name is required",
                  },
                })}
              >
                <option value="">Select room</option>
                {
                  rooms.map(item => (
                    <option key={item.id} value={item.id} >{item.tenPhong}</option>
                  ))
                } 
              </select>

              {errors.maPhong && (
                <p className={styles.txtError}>{errors.maPhong.message}</p>
              )}
            </div>
        </Col>
        <Col span={12}>
          <div className={styles.input}>
            <label>Start date</label>
            <input
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
              <p className={styles.txtError}>{errors.soLuongKhach.message}</p>
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
              <p className={styles.txtError}>{errors.maNguoiDung.message}</p>
            )}
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

export default EditBooking