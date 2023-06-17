import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'


function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  // Trường hợp chưa đăng nhập, điều hướng về trang đăng nhập
  if (!user) {
    return <Navigate to={`/signin?redirectUrl=${pathname}`} replace />;
  }

  // Trường hợp đã đăng nhập => cho phép truy cập
  return children;
}

export default ProtectedRoute