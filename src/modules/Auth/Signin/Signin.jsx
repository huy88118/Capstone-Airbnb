import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../../slices/userSlice";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdAccountCircle } from "react-icons/md";
import { Checkbox } from "@mantine/core";
import styles from "./SignIn.module.scss";
import swal from "sweetalert";

// Định nghĩa các xác thực cho từng input
const schema = yup.object({
  email: yup.string().required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số"
    ),
});

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Khai báo các giá trị khởi tạo cho các input
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    // Khai báo schema validation bằng yup
    resolver: yupResolver(schema),
  });

  const { user, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (values) => {
    dispatch(signin(values));
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // Kiểm tra nếu có thông tin user => đã đăng nhập => điều hướng về trang Home
  if (user) {
    swal("Đăng nhập thành công", "" , "success" );
    const url = searchParams.get("redirectUrl") || "/";
    return <Navigate to={url} />;
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <div className={styles.iconSignIn}>
          <MdAccountCircle />
        </div>

        <h1>Đăng nhập</h1>

        <form className={styles.formSignIn} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputSignIn}>
            <label>Email</label>
            <input
              type="text"
              placeholder="Nhập email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email không được để trống!",
                },
              })}
            />
            {errors.email && (
              <p className={styles.txtError}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputSignIn}>
            <label>Mật khẩu</label>
            <input
              type="text"
              placeholder=" Nhập mật khẩu"
              {...register("password", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
              })}
            />
            {errors.password && (
              <p className={styles.txtError}>{errors.password.message}</p>
            )}
          </div>

          <div className="text-start my-3">
            <Checkbox label="Nhớ tài khoản" color="orange" />
          </div>

          {error && <p className={styles.txtError}>{error}</p>}
          <div className={styles.btnSignIn}>
            <button>Đăng nhập</button>
          </div>
        </form>
        <div className={styles.linkSignUp}>
          <p>
            Chưa có tài khoản
            <span>
              <Link to="/SignUp">Đăng kí ngay </Link>
            </span>
            !
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;

// const handleSubmit = (obSubmit) => {
//   return () => {
//     // logic ...
//     obSubmit(values)
//   }
// }

// onSubmit={handleSubmit(obSubmit)}
