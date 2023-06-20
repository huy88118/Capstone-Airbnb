import React, { useState, useEffect } from "react";
import { apiGetBookingInfo } from "../../../apis/locationAPI";
import styles from "./BookingRoom.module.scss";
import Swal from "sweetalert2";

function BookingRoom({ id }) {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  const getLocations = async () => {
    try {
      const data = await apiGetBookingInfo();
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

  const handleClick = () => {
    Swal.fire("Đặt phòng thành công!", "", "success");
  };
  return (
    <div>
      {locations.map((item) => {
        if (item.id.toString() === id) {
          return (
            <div key={item.id}>
              <h3 className={styles.tenPhong}>Phòng {item.tenPhong}</h3>
              <img className={styles.imgRoom} src={item.hinhAnh} alt="id" />

              <div className=" container d-flex mt-3 justify-content-center">
                <div className="col-5">
                  {/* Mô tả : */}
                  <p className={styles.textMoTa}>{item.moTa}</p>
                  <div className={styles.chiTietPhong}>
                    <h3>Chi tiết phòng</h3>
                    <ul>
                      <li>Số khách: {item.khach}</li>
                      <li>Số phòng ngủ : {item.phongNgu}</li>
                      <li>Phòng tắm : {item.phongTam}</li>
                    </ul>
                  </div>

                  <div className={styles.tienIch}>
                    <h3>Các tiện ích </h3>

                    <ul>
                      <span> {item.banLa && <li>Bàn là</li>}</span>
                      <span> {item.mayGiat && <li>Máy giặt</li>}</span>
                      <span> {item.tivi && <li>Tivi</li>}</span>
                      <span> {item.dieuHoa && <li>Điều hòa</li>}</span>
                      <span> {item.wifi && <li>Wifi</li>}</span>
                      <span>{item.bep && <li>Bếp</li>}</span>
                      <span> {item.doXe && <li>Chổ đậu xe</li>}</span>
                      <span> {item.hoBoi && <li>Hồ bơi</li>}</span>
                      <span>{item.banUi && <li>Bàn ủi</li>}</span>
                    </ul>
                  </div>
                </div>
                <div className="">
                  <div className={styles.styleBooking}>
                    <h2>Đặt phòng ngay</h2>
                    <div className={styles.text}>
                      <span>
                        <p>Ngày đến</p>
                        <input placeholder="Ngày đến" type="date" />
                      </span>

                      <span>
                        {" "}
                        <p>Ngày đi</p>
                        <input placeholder="Ngày đi" type="date" />
                      </span>
                      <span>
                        {" "}
                        <p>Số lượng khách</p>
                        <input placeholder="Số lượng khách" type="number" />
                      </span>
                      <button
                        onClick={handleClick}
                        className=" mt-1 btn btn-primary"
                      >
                        Đặt phòng
                      </button>
                    </div>
                    <div className={styles.giaThue}>
                      {" "}
                      <h2>Giá thuê : ${item.giaTien}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default BookingRoom;
