import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserAddOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Col, Row } from "antd";

import authAPI from "../../../services/authAPI";
import styles from "./Register.module.scss";

function Register()  {
  const navigate = useNavigate();
  const [successRe, setSuccessRe] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "",
    },
  });

  const { errors } = formState;
  const onSubmit = async (values) => {
    try {
      await authAPI.register(values);

      Swal.fire({
        title: "Success!",
        text: "Congratulations on your successful registration",
        icon: "success",
        confirmButtonText: "Close",
      });

      setSuccessRe(true);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  if (successRe) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.wrapRegister}>
      <div className={styles.register}>
        {/* Title */}
        <div className={styles.title}>
          <div className={styles.iconRegister}>
            <UserAddOutlined />
          </div>
          <h1>Register</h1>
        </div>
        {/* Form */}
        <div className={styles.formRegister}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[10, 10]}>
              <Col span={12}>
                {/* Name */}
                <div className={styles.inputRegister}>
                  <label>Name</label>
                  <input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required!",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className={styles.txtError}>{errors.name.message}</p>
                  )}
                </div>
              </Col>

              <Col span={12}>
                {/* Email */}
                <div className={styles.inputRegister}>
                  <label>Email</label>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is require!",
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
                {/* Password */}
                <div className={styles.inputRegister}>
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
                    <p className={styles.txtError}>{errors.password.message}</p>
                  )}
                </div>
              </Col>

              <Col span={12}>
                {/* phone */}
                <div className={styles.inputRegister}>
                  <label>Phone</label>
                  <input
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Phone is required!",
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
                {/* birthday */}
                <div className={styles.inputRegister}>
                  <label>Birthday</label>
                  <input
                  type="date"
                    {...register("birthday", {
                      required: {
                        value: true,
                        message: "Sinh nhật không được để trống !",
                      },
                    })}
                  />
                  {errors.birthday && (
                    <p className={styles.txtError}>{errors.birthday.message}</p>
                  )}
                </div>
              </Col>

              <Col span={12}>
                {/* Gender */}
                <div className={styles.inputRegister}>
                  <label>Gender</label>
                  <select
                    {...register("gender", {
                      required: {
                        value: true,
                        message: "Giới tính không được để trống",
                      },
                    })}
                  >
                    <option value="">Select Gender</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  {errors.gender && (
                    <p className={styles.txtError}>{errors.gender.message}</p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                {/* Role */}
                <div className={styles.inputRegister}>
                  <label>Role</label>
                  <select
                    {...register("role", {
                      required: {
                        value: true,
                        message: "Role is required",
                      },
                    })}
                  >
                    <option value="">Select Role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                  </select>
                  {errors.role && (
                    <p className={styles.txtError}>{errors.role.message}</p>
                  )}
                </div>
              </Col>
              <Col span={12}></Col>
            </Row>
            <div className={styles.feature}>
              <p onClick={() => navigate("/login")}>Login</p>
            </div>
            <div className={styles.btn}>
              <button>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register