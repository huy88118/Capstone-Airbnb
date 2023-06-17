import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Col, Row } from "antd";
import { getRoomById, getRooms } from "../../../../../slices/roomSlice";
import Loading from "../../../../../components/Loading/Loading";

import styles from "./EditRoom.module.scss";
import roomAPI from "../../../../../services/RoomAPI";
import { handleModalEditRoom } from "../../../../../slices/modalSlice";
import { getLocations } from "../../../../../slices/locationSlice";

function EditRoom({ idRoom }) {
  const dispatch = useDispatch();
  const { room, loadingRoom } = useSelector((state) => state.roomSlice);
  const { modalEditRoom } = useSelector((state) => state.modalSlice);
  const { locations } = useSelector(state => state.locationSlice)

  useEffect(() => {
    dispatch(getRoomById(idRoom));
  }, [idRoom, modalEditRoom]);


  const { register, handleSubmit, formState, reset, setValue, getValues } = useForm({
    defaultValues: {
      tenPhong: "",
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: "",
      giaTien: 0,
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
      maViTri: "",
      hinhAnh: "",
    },
  });
  const { errors } = formState;

  useEffect(() => {
    for (let key in room) {
      setValue(key, room[key]);
    }
  }, [room]);

  const onSubmit = async (values) => {
    try {
        
      await roomAPI.updateRoom(idRoom, values);
      reset();
      dispatch(getRooms());
      dispatch(handleModalEditRoom());
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

  const handleDeleteImg = () => {
    if(!getValues("hinhAnh")) return;
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

  if (loadingRoom) {
    return <Loading />;
  }
  return (
    <div className={styles.wrapFormEditRoom}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col span={9}>
          <div className={styles.input}>
            <label>ID room</label>
            <input defaultValue={idRoom} disabled />
          </div>
        </Col>
        <Col span={15}></Col>
        <Col span={9}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className={styles.input}>
                <label>Room name</label>
                <input
                  {...register("tenPhong", {
                    required: {
                      value: true,
                      message: "Room name is required",
                    },
                  })}
                />
                {errors.tenPhong && (
                  <p className={styles.txtError}>{errors.tenPhong.message}</p>
                )}
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.desc}>
                <label>Description</label>
                <textarea
                  {...register("moTa", {
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  })}
                />
                {errors.moTa && (
                  <p className={styles.txtError}>{errors.moTa.message}</p>
                )}
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.inputImage}>
                <label>Image</label>
                <input disabled type="text" {...register("hinhAnh")} />
                {/* <div> */}
                <button type="button" onClick={handleDeleteImg}>
                  Delete
                </button>
                {/* </div> */}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={15}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div className={styles.input}>
                <label>Customer</label>
                <input type="number" {...register("khach")} />
                {errors.khach && (
                  <p className={styles.txtError}>{errors.khach.message}</p>
                )}
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.input}>
                <label>Price</label>

                <input {...register("giaTien")} />
                {errors.giaTien && (
                  <p className={styles.txtError}>{errors.giaTien.message}</p>
                )}
              </div>
            </Col>
            <Col span={8}>
            <div className={styles.input}>
                  <label>Location</label>
                  <select
                    {...register("maViTri", {
                      required: {
                        value: true,
                        message: "Location is required",
                      },
                    })}
                  >
                    <option value="">Select location</option>
                    {locations.map((item) => (
                      <option key={item.id} value={item.id}>{item.tenViTri}</option>
                    ))}
                  </select>

                  {errors.maViTri && (
                    <p className={styles.txtError}>
                      {errors.maViTri.message}
                    </p>
                  )}
                </div>
            </Col>
            <Col span={8}>
              <div className={styles.input}>
                <label>Bedroom</label>
                <input
                  type="number"
                  {...register("phongNgu", {
                    required: {
                      value: true,
                      message: "Customer is required",
                    },
                  })}
                />
                {errors.phongNgu && (
                  <p className={styles.txtError}>{errors.phongNgu.message}</p>
                )}
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.input}>
                <label>Bed</label>
                <input
                  type="number"
                  {...register("giuong", {
                    required: {
                      value: true,
                      message: "Bed is required",
                    },
                  })}
                />
                {errors.giuong && (
                  <p className={styles.txtError}>{errors.giuong.message}</p>
                )}
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.input}>
                <label>Bathroom</label>
                <input
                  type="number"
                  {...register("phongTam", {
                    required: {
                      value: true,
                      message: "Bathroom is required",
                    },
                  })}
                />
                {errors.phongTam && (
                  <p className={styles.txtError}>{errors.phongTam.message}</p>
                )}
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.select}>
                <label>Washing machine</label>
                <select {...register("mayGiat")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.select}>
                <label>Flat iron</label>
                <select {...register("banLa")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.select}>
                <label>Television</label>
                <select {...register("tivi")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.select}>
                <label>Air conditional</label>
                <select {...register("dieuHoa")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.select}>
                <label>Wifi</label>
                <select {...register("wifi")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.select}>
                <label>Kitchen</label>
                <select {...register("bep")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.select}>
                <label>Parking</label>
                <select {...register("doXe")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.select}>
                <label>Pool</label>
                <select {...register("hoBoi")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.select}>
                <label>Iron</label>
                <select {...register("banUi")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className={styles.btn}>
        <button>Submit</button>
      </div>
    </form>
  </div>
);
};

export default EditRoom