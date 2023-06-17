import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Row, Table } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { getUserById } from "../../../../../slices/userSlice";
import Loading from "../../../../../components/Loading/Loading";
import { getBookingByUser } from "../../../../../slices/bookingRoomSlice";

import styles from "./UserId.module.scss";

function UserId() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loadingUser } = useSelector((state) => state.userSlice);
  const { bookingRooms, loading: loadBooking } = useSelector(
    (state) => state.bookingRoomSlice
  );

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

  useEffect(() => {
    dispatch(getBookingByUser(id));
  }, [id]);

  // Table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Room Code",
      dataIndex: "roomCode",
      key: "roomCode",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Customer Quantity",
      dataIndex: "customerQuan",
      key: "customerQuan",
    },
    {
      title: "User Code",
      dataIndex: "userCode",
      key: "userCode",
    },
  ];

  const dataSource = bookingRooms.map((item) => {
    return {
      key: item.id,
      id: item.id,
      roomCode: item.maPhong,
      startDate: item.ngayDen,
      endDate: item.ngayDi,
      customerQuan: item.soLuongKhach,
      userCode: item.maNguoiDung,
    };
  });

  if (!user || loadBooking) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapDetailUser}>
    {/* Header */}
    <div className={styles.headerDetailUser}>
      <h4>User ID : {user.id}</h4>
    </div>

    {/* InfoUser */}
    <div className={styles.contentInfoUser}>
      <Row>
        <Col span={3}>
          <div className={styles.title}>
            <h3>Information</h3>
          </div>
        </Col>
        <Col span={7}>
          <div className={styles.avatarUser}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className={styles.notAvatar}><UserOutlined /></div>
            )}
          </div>
        </Col>
        <Col span={7}>
          <div className={styles.infoUser}>
            <p>Id: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        </Col>
        <Col span={7}>
          <div className={styles.infoUser}>
            <p>Phone: {user.phone}</p>
            <p>Birthday: {user.birthday}</p>
            <p>Gender: {`${user.gender}`} </p>
            <p>Role: {user.role}</p>
          </div>
        </Col>
      </Row>
    </div>

    {/* Booking */}
    <div className={styles.bookingUser}>
      <Row>
        <Col span={3}>
          <div className={styles.title}>
            <h3 className={styles.title}>
              Booking <br /> room
            </h3>
          </div>
        </Col>
        <Col span={21}>
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={loadBooking}
            size="middle"
            scroll={{
              y: 230,
            }}
            pagination={{
              position: ["bottomCenter"],
            }}
          />
        </Col>
      </Row>
    </div>
  </div>
);
};


export default UserId