import React, { useState } from "react";
import {
  HomeOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  GoldOutlined,
  BookOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../slices/authSlice";
import styles from "./SideBar.module.scss";
import Loading from "../../../components/Loading/Loading";

function SideBar()  {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const { user: admin, loading } = useSelector((state) => state.authSlice);
  // const { user: admin } = user;
  
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      <div onClick={toggleCollapsed}>Control</div>,
      "1",
      collapsed ? (
        <div onClick={toggleCollapsed}>
          <MenuUnfoldOutlined />
        </div>
      ) : (
        <div onClick={toggleCollapsed}>
          <MenuFoldOutlined />
        </div>
      )
    ),
    getItem(<Link to="/admin">Home</Link>, "2", <HomeOutlined />),
    getItem("User Management", "sub1", <IdcardOutlined />, [
      getItem(<Link to="/admin/users">Users</Link>, "3"),
      getItem(<Link to="/admin/addUser">Add User</Link>, "4"),
    ]),
    getItem("Room Management", "sub2", <GoldOutlined />, [
      getItem(<Link to="/admin/rooms">Rooms</Link>, "5"),
      getItem(<Link to="/admin/addRoom">Add Room</Link>, "6"),
    ]),
    getItem("Booking Management", "sub3", <BookOutlined />, [
      getItem(<Link to="/admin/bookedRoom">Booking Rooms</Link>, "7"),
      getItem(<Link to="/admin/bookingRoom">Add Booking Rooms</Link>, "8"),
    ]),
    getItem("Comment Management", "sub4", <CommentOutlined />, [
      getItem(<Link to="/admin/comments">Comments</Link>, "9"),
      getItem(<Link to="/admin/addComment">Add Comment</Link>, "10"),
    ]),
    getItem("Location Management", "sub5", <EnvironmentOutlined />, [
      getItem(<Link to="/admin/locations">Locations</Link>, "11"),
      getItem(<Link to="/admin/addLocation">Add Location</Link>, "12"),
    ]),
    getItem("Account", "sub6", <UserOutlined />, [
      getItem(<Link to={`/admin/users/${admin?.id}`}>Information</Link>, "13"),
      getItem(<Link to={"/register"}>Register</Link>, "14"),

      getItem(
        <div onClick={() => dispatch(logout())}>
          <p>Logout</p>
        </div>,
        "15"
      ),
    ]),
  ];

  const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6"];

  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className={styles.wrapSidebar}>
    {collapsed ? (
      ""
    ) : (
      <div className={styles.detailAdmin}>
        <div className={styles.avatar}>
          {admin.avatar ? (
            <img src={admin.avatar} alt="avatar" />
          ) : (
            <div className={styles.notAvatar}>
              <UserOutlined />
            </div>
          )}
        </div>
        <h3>{admin.role}</h3>
        <p>
          Id: {admin.id} -
          <span
            className={styles.detail}
            onClick={() => navigate(`/admin/users/${admin.id}`)}
          >
            Detail
          </span>
        </p>
        <p>Name: {admin.name} </p>
      </div>
    )}

    <div className={styles.wrapMenu}>
      <Menu
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        // theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  </div>
);
};

export default SideBar