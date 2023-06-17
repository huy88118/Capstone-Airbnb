import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { getBookingRooms } from "../../../slices/bookingRoomSlice";
import { getComments } from "../../../slices/commentSlice";
import { getLocations } from "../../../slices/locationSlice";
import { getRooms } from "../../../slices/roomSlice";
import { getUser } from "../../../slices/userSlice";
import { Col, Row } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./Home.module.scss";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading: loadUsers } = useSelector((state) => state.userSlice);
  const { rooms, loading: loadRooms } = useSelector((state) => state.roomSlice);
  const { bookingRooms, loading: loadbooking } = useSelector(
    (state) => state.bookingRoomSlice
  );
  const { comments, loading: loadComments } = useSelector(
    (state) => state.commentSlice
  );
  const { locations, loading: loadLocations } = useSelector(
    (state) => state.locationSlice
  );

  // eslint-disable-next-line 

  useEffect(() => {
    dispatch(getUser());
  }, []);

   // eslint-disable-next-line 

  useEffect(() => {
    dispatch(getRooms());
  }, []);

   // eslint-disable-next-line 

  useEffect(() => {
    dispatch(getBookingRooms());
  }, []);

   // eslint-disable-next-line 

  useEffect(() => {
    dispatch(getComments());
  }, []);

   // eslint-disable-next-line 

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  if (loadUsers || loadRooms || loadbooking || loadComments || loadLocations) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapHome}>
    <div className={styles.headerHomeAdmin}>
      <h4>HOME</h4>
    </div>
    <div className={styles.contentHome}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div className={styles.group} onClick={() => navigate("/admin/users")}>
            <div className={styles.contentGroup}>
              <h1>{users.length}</h1>
              <p>Users</p>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.group}>
            <div className={styles.contentGroup} onClick={() => navigate("/admin/rooms")}>
              <h1>{rooms.length}</h1>
              <p>Rooms</p>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.group}>
            <div className={styles.contentGroup} onClick={() => navigate("/admin/bookedRoom")}>
              <h1>{bookingRooms.length}</h1>
              <p>Booking</p>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.group}>
            <div className={styles.contentGroup} onClick={() => navigate("/admin/comments")}>
              <h1>{comments.length}</h1>
              <p>Comments</p>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.group}>
            <div className={styles.contentGroup} onClick={() => navigate("/admin/locations")}>
              <h1>{locations.length}</h1>
              <p>Locations</p>
            </div>
          </div>
        </Col>
        <Col span={18}>
          <div className={styles.carouselLocation}>
            <Swiper
              loop={true}
              slidesPerView={3}
              spaceBetween={5}
              navigation={true}
              // width={500}
              modules={[Navigation]}
              className="mySwiper"
            >
              {locations.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={styles.imgCarousel}>
                    <img src={item.hinhAnh} alt={item.tenViTri} />
                    <div className={styles.detailLocation}>
                      <p>{item.tenViTri}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);
};

export default Home