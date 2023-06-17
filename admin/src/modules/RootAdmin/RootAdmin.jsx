import React from 'react'
import SideBar from "./SideBar/SideBar";

import { Outlet } from "react-router-dom";

import styles from "./RootAdmin.module.scss";

function RootAdmin() {
  return (
    <div className={styles.wrapRoot}>
    <div className="container-fluid">
      <div className={styles.rootAdmin}>
        <div>
          <SideBar />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  </div>
);
};

export default RootAdmin