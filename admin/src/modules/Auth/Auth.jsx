import React from 'react'
import { Outlet } from 'react-router-dom';
import styles from './Auth.module.scss';

function Auth() {
  return (
    <div className={styles.Auth}>
      
      <Outlet />
    </div>
  );
};

export default Auth