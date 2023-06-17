import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserById } from "../../../../../slices/userSlice";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Col, Row } from "antd";
import Loading from "../../../../../components/Loading/Loading";
import userAPI from "../../../../../services/userAPI";
import { UserOutlined } from "@ant-design/icons";
import { handleModalEditUser } from "../../../../../slices/modalSlice";

import styles from "./EditUser.module.scss";

function EditUser({ idUser }) {
  const dispatch = useDispatch();
  const { user, loadingUser } = useSelector((state) => state.userSlice);
  const { modalEditUser } = useSelector(state => state.modalSlice);
  // State

  useEffect(() => {
    dispatch(getUserById(idUser));
  }, [idUser,modalEditUser]);

  // Form
  const { register, handleSubmit, formState, setValue, } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "",
    },
    mode: "onTouched",
  });

  const { errors } = formState;
  useEffect(() => {
    for (let key in user) {
      setValue(key, user[key]);
    }
    console.log(user);
  }, [user]);

  const onSubmit = async (values) => {
    try {
      await userAPI.editUser(user.id,values)
      Swal.fire({
        title: "Success!",
        text: "Congratulations on your successful",
        icon: "success",
        confirmButtonText: "Close",
      });
      dispatch(handleModalEditUser());
      dispatch(getUser());
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapEditUser}>
    <Row justify="center">
      <Col span={18}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row justify="space-around">
              <Col span={12}>
                <div className={styles.input}>
                  <label> ID user</label>
                <input defaultValue={user?.id} disabled />
                </div> 
              </Col>
              <Col span={12}></Col>
              <Col span={12}>
                <div className={styles.input}>
                  <label>Name</label>
                  <input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className={styles.txtError}>{errors.name.message}</p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.input}>
                  <label>Email</label>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is require",
                      },
                      pattern: {
                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                        message: "Email must be in the format!",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className={styles.txtError}>{errors.email.message}</p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.input}>
                  <label>Phone</label>
                  <input
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Phone is required",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Phone is number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className={styles.txtError}>{errors.phone.message}</p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.input}>
                  <label>Birthday</label>
                  <input
                    {...register("birthday", {
                      required: {
                        value: true,
                        message: "Birthday is require",
                      },
                    })}
                  />
                  {errors.birthday && (
                    <p className={styles.txtError}>
                      {errors.birthday.message}
                    </p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.input}>
                  <label>Gender</label>
                  <select
                    {...register("gender", {
                      required: {
                        value: true,
                        message: "Gender is required",
                      },
                    })}
                  >
                    <option value="">Select gender</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  {errors.gender && (
                    <p className={styles.txtError}>{errors.gender.message}</p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.input}>
                  <label>Role</label>
                  <select
                    {...register("role", {
                      required: {
                        value: true,
                        message: "Role is required",
                      },
                    })}
                  >
                    <option value="">Select role</option>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  {errors.role && (
                    <p className={styles.txtError}>{errors.role.message}</p>
                  )}
                </div>
              </Col>
            </Row>
            <div className={styles.btn}>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </Col>
      <Col span={6}>
        {user?.avatar ? (
          <div className={styles.avatarUser}>
            <img src={user.avatar} alt="avatar" />
          </div>
        ) : (
          <div className={styles.wrapAvatarNull}>
            <div className={styles.iconAvatarNull}>
            <UserOutlined />
            </div>
          </div>
        )}
      </Col>
    </Row>
  </div>
);
};


export default EditUser