import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../slices/authSlice";

export default function Protected({ children })  {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authSlice);
  
  if (!user) {
    console.log("not User",user)
    return <Navigate to="/" />;
  }
  
  // if (user.user.role !== "ADMIN") {
  //   alert("Not Admin");
  //   dispatch(logout());
  //   return ;
  // }

  return children

};

