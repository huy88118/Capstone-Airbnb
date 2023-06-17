import React, { useState, useEffect } from "react";
import { apiGetLocations } from "../../../apis/locationAPI";
import styles from "./Banner.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import SwiperCore, { EffectFade } from "swiper";
import "swiper/swiper-bundle.css";

function Banner() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

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
    <div style={{ marginTop: "20px" }}>
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, EffectFade]}
        className={styles.mySwiper}
      >
        {locations.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <img
              src={item.hinhAnh}
              alt={item.tenViTri}
              className={styles.bannerImg}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
