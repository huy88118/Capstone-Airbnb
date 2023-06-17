import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Col, Row } from "antd";
import userAPI from "../../../../../services/userAPI";

import styles from "./AddUser.module.scss";

function AddUser() {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "",
    },
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = async (values) => {
    try {
      await userAPI.createUser(values);
      reset();
      Swal.fire({
        title: "Success!",
        text: "Congratulations on your successful adding user",
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
    <div className={styles.wrapAddUser}>
    <div className={styles.headerAddUser}>
      <h4>Adding User</h4>
    </div>
    <div className={styles.wrapForm}>
      <Row justify="center">
        <Col span={20}>
          <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row justify="space-around">
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
                      <p className={styles.txtError}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.input}>
                    <label>Password</label>
                    <input
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 5,
                          message: "Password must be at least 5 character",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className={styles.txtError}>
                        {errors.password.message}
                      </p>
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
                      <p className={styles.txtError}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.input}>
                    <label>Birthday</label>
                    <input
                      type="date"
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
                      <p className={styles.txtError}>
                        {errors.gender.message}
                      </p>
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
                <Col span={12}></Col>
              </Row>
              <div className={styles.btn}>
                <button>Submit</button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);
};


export default AddUser