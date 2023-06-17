import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
function MainLayout() {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
