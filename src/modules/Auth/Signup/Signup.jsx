import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { apiSignup } from "../../../apis/userAPI";

import swal from "sweetalert";

function Signup() {
  const [successRegister, seSuccessRegister] = useState(false);

  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
     name: "",
      email: "",
      password: "",
      phone: "",
     
    },
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = async (value) => {
    const { enterPassword: _, ...payload } = value;
    try {
      console.log(payload);
      await apiSignup(payload);
      seSuccessRegister(true);
      swal("Đăng kí thành công", "", "success");
    } catch (error) {
      swal("Đăng kí thất bại", "", "error");
      console.log(error);
    }
  };

  if (successRegister) {
    return <Navigate to="/signIn" replace />;
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpContent}>
        <div className={styles.iconSignUp}>
          <AiOutlineUsergroupAdd />
        </div>

        <h1>Đăng kí</h1>

        <form className={styles.formSignUp} onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.inputSignUp}>
            <label>Họ tên</label>
            <input
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Họ tên không được để trống!",
                },
              })}
            />
            {errors.name && (
              <p className={styles.txtError}>{errors.name.message}</p>
            )}
          </div>

        <div className={styles.inputSignUp}>
            <label>Email</label>
            <input
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email không được để trống!",
                },
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                  message: "Email phải đúng định dạng",
                },
              })}
            />
            {errors.email && (
              <p className={styles.txtError}>{errors.email.message}</p>
            )}
          </div>
         
          <div className={styles.inputSignUp}>
            <label>Mật khẩu</label>
            <input
              type="text"
              {...register("password", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống!",
                },
                minLength: {
                  value: 5,
                  message: "Mật khẩu phải từ 5 - 20 kí tự",
                },
                maxLength: {
                  value: 20,
                  message: "Mật khẩu phải từ 5 - 20 kí tự",
                },
              })}
            />
            {errors.password && (
              <p className={styles.txtError}>{errors.password.message}</p>
            )}
          </div>
          <div className={styles.inputSignUp}>
            <label>Nhập lại mật khẩu</label>
            <input
              type="text"
              {...register("enterPassword", {
                required: {
                  value: true,
                  message: "Nhập lại mật khẩu không được để trống!",
                },
                validate: (val) =>
                  val === watch("password") || "Mật khẩu không trùng khớp",
              })}
            />
            {errors.enterPassword && (
              <p className={styles.txtError}>{errors.enterPassword.message}</p>
            )}
          </div>
         
          <div className={styles.inputSignUp}>
            <label>Số điện thoại</label>
            <input
              type="text"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Số điện thoại không được để trống!",
                },
              })}
            />
            {errors.phone && (
              <p className={styles.txtError}>{errors.phone.message}</p>
            )}
          </div>
        

          <div className={styles.btnSignUp}>
            <button>Đăng kí</button>
          </div>
        </form>
        <div className={styles.linkSignUp}>
          <p>
            Đã có tài khoản
            <span>
              <Link to="/SignIn">Đăng nhập ngay</Link>
            </span>
            !
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
