import React from 'react'
import Login from "../Auth/Login/Login";
import styles from "./Access.module.scss";

function Access() {
  return (
    <div className={styles.wrapAccess}>
    <div className={styles.access}>
      <div className={styles.title}>
        <h1>AIRBNB</h1>
        <h2>WELCOME TO ADMIN</h2>
        <p>Please login to access</p>
      </div>

      <div className={styles.login}>
        <Login />
      </div>
    </div>
  </div>
);
};

export default Access