import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import styles from "./Footer.module.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Typography } from "antd";

const { Paragraph } = Typography;

function Footer() {
  return (
    <div>
      <div>
        <p
          id="uuDai"
          style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}
        >
          Chương trình khuyến mại chỗ ở
        </p>
        <div
          style={{
            width: "80%",
            height: "80%",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="https://www.tugo.com.vn/wp-content/uploads/imgpsh_fullsize_anim-7-815x433.png"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://owa.bestprice.vn/images/articles/uploads/hot-san-du-lich-0-dong-vo-van-deal-giam-toi-70-tai-hoi-cho-du-lich-2022-624165f55543d.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.tugo.com.vn/wp-content/uploads/imgpsh_fullsize_anim-7-815x433.png"
                alt=""
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://phunuvietnam.mediacdn.vn/thumb_w/700/2020/2/20/du-lich-7-1582168011179538965086-crop-1582168032603874695771-crop-158216816103637648633.png"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://dulichviet.com.vn/images/bandidau/TIN%20TUC/TET-2020/banner%20thu%205%20tuoi%20sang%20831x430.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div
          className="text-center"
          style={{ backgroundColor: "rgb(42 42 46)", marginTop: "20px" }}
        >
          <Paragraph className="text-white xs:text-xs pt-3">
            Mọi nội dung tại đây © 2022 – 2023 Công ty TNHH Tư nhân Một Mình
            Tôi. Bảo Lưu Mọi Quyền.
          </Paragraph>
          <Paragraph className="text-white xs:text-xs">
            Agoda.com là thành viên của Tập đoàn Booking Holdings, nhà cung cấp
            dịch vụ du lịch trực tuyến & các dịch vụ có liên quan hàng đầu thế
            giới.
          </Paragraph>
          <div className={styles.logo}>
            <img
              src="https://cachlam.info/wp-content/uploads/2022/11/Agoda-Logo-500x500-1.png"
              alt=""
            />
            <img
              src="https://press.priceline.com/wp-content/uploads/2019/10/Priceline_Logo_RGB_Blue_2019-1.png"
              alt=""
            />
            <img
              src="https://logos-world.net/wp-content/uploads/2021/07/Kayak-Logo.png"
              alt=""
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png"
              alt=""
            />
            <img
              src="https://1000logos.net/wp-content/uploads/2020/04/Budget-Logo.png"
              alt=""
            />
            <img
              src="https://ik.imagekit.io/tvlk/blog/2020/01/traveloka-official-logo-resmi-white-new.png"
              alt=""
            />
          </div>
          <small className="text-white">
            @phone: 0918699843 email: lamtrienduc89@gmail.com
          </small>
        </div>
      </div>
    </div>
  );
}

export default Footer;
