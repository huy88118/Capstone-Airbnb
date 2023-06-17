import React from 'react'
import { BellOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./Header.module.scss";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.authSlice);
  return (
    <div className={styles.wrapHeader}>
      <div className={styles.content}>
        <div className={styles.iconBell}>
          <BellOutlined />
        </div>
        <div className={styles.account}>
          <div className={styles.iconAccount}>
            <UserOutlined />
          </div>
          <p>{user.user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Header