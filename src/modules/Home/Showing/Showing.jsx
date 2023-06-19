import React, { useState, useEffect } from "react";
import { apiGetLocations } from "../../../apis/locationAPI";
import styles from "./Showing.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Grid } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/grid";
import { useNavigate } from "react-router-dom";
SwiperCore.use([Pagination, Grid]);

function Showing() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getLocations = async () => {
    try {
      const data = await apiGetLocations();
      console.log(data);
      setLocations(data.content);
    } catch (error) {
      setError(error.response?.data?.content);
    }
  };
  useEffect(() => {
    getLocations();
  }, []);

  if (error) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} id="khuVuc">
        <Swiper
          slidesPerView={4}
          // spaceBetween={25}
          grid={{
            rows: 2,
            fill: "row",
          }}
          pagination={{
            clickable: true,
          }}
          className={styles.mySwiper}
        >
          {locations?.map((item, index) => (
            <SwiperSlide key={index} className={styles.RoomDetails}>
              <div>
                <img
                  src={item.hinhAnh}
                  className={styles.bannerImg}
                  width="60%"
                  height="auto"
                />

                <div className={styles.tenTinh}>
                  {item.tinhThanh.substring(0, 20)}
                </div>
                <div>
                  <p className={styles.viTri}>{item.tenViTri}</p>
                </div>
                <div className={styles.button}>
                  <button
                    onClick={() => navigate(`/roomdetails/${item.id}`)}
                    className={styles.choseRoom}
                  >
                    Xem Phòng
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Showing;
