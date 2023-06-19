import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signout } from "../../slices/userSlice";
import styles from "./Header.module.scss";
import { Avatar } from "antd";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signout());
    localStorage.removeItem("user");
  };

  const handleSignin = () => {
    //chuyển sang trang /signin
    navigate("/signin");
  };
  console.log(user);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img
              style={{ width: "30%" }}
              src="img/Airbnb_Logo_Bélo.svg.png"
              alt=""
            />
          </Link>
        </div>
        <div className={styles.header__menu}>
          <a href="#khuVuc">
            <h4>Khu Vực</h4>
          </a>
          <a href="#khachSan">
            <h4>Khách Sạn</h4>
          </a>
          <a href="#hoatDong">
            <h4>Hoạt Động</h4>
          </a>
          <a href="#uuDai">
            <h4>Ưu Đãi</h4>
          </a>
        </div>
        <div className={styles.header__right}>
          {user ? (
            <>
              <Avatar style={{ width: "45px", height: "45px" }}>
                {" "}
                <p style={{ fontSize: "40px", color: "black" }}>
                  {user.user.name}
                </p>
              </Avatar>
              <button onClick={handleLogout} className={styles.button1}>
                Đăng xuất
              </button>
            </>
          ) : (
            <button onClick={handleSignin} className={styles.button2}>
              Đăng Nhập{" "}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
