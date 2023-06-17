import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import Swal from "sweetalert2";
import roomAPI from "../../../../../services/RoomAPI";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../../../../../slices/locationSlice";
import Loading from "../../../../../components/Loading/Loading";
import styles from "./AddRoom.module.scss";

function AddRoom() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const { locations, loading } = useSelector((state) => state.locationSlice);

  const { register, handleSubmit, formState, reset } = useForm({
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

  const onSubmit = async (values) => {
    try {
      await roomAPI.createRoom(values);
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
  console.log(locations)
  return (
    <div className={styles.wrapAddRoom}>

      <div className={styles.headerAddRoom}>
        <h4>ADDING ROOM</h4>
      </div>

      <div className={styles.wrapForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
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
                      <p className={styles.txtError}>
                        {errors.tenPhong.message}
                      </p>
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
                      <p className={styles.txtError}>
                        {errors.giaTien.message}
                      </p>
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
                      <option value="">Select location </option>
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
                      <p className={styles.txtError}>
                        {errors.phongNgu.message}
                      </p>
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
                      <p className={styles.txtError}>
                        {errors.phongTam.message}
                      </p>
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
    </div>
  );
};


export default AddRoom