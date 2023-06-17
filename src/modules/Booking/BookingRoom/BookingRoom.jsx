import React, { useState, useEffect } from "react";
import { apiGetBookingInfo } from "../../../apis/locationAPI";
import styles from "./BookingRoom.module.scss";

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
  return (
    <div className={styles.bg}>
      {locations.map((item) => {
        if (item.id.toString() === id) {
          return (
            <div key={item.id}>
              <h2>Phòng {item.tenPhong}</h2>
              <img className={styles.imgRoom} src={item.hinhAnh} alt="id" />

              <div className="d-flex justify-content-between col-9 mt-5">
                <div>
                  <div className={styles.text}>
                    <p> Tổng số khách: {item.khach}</p>
                    <p>Số phòng ngủ : {item.phongNgu}</p>
                    <p>Phòng tắm {item.phongTam}</p>
                  </div>
                  <h3>Các tiện ích dành cho bạn :</h3>
                  <div className={styles.tienIch}>
                    <p> {item.banLa && <span>Bàn là</span>}</p>
                    <p> {item.mayGiat && <span>Máy giặt</span>}</p>
                    <p> {item.tivi && <span>Tivi</span>}</p>
                    <p> {item.dieuHoa && <span>Điều hòa</span>}</p>
                    <p> {item.wifi && <span>Wifi</span>}</p>
                    <p>{item.bep && <span>Bếp</span>}</p>
                    <p> {item.doXe && <span>Chổ đậu xe</span>}</p>
                    <p> {item.hoBoi && <span>Hồ bơi</span>}</p>
                    <p>{item.banUi && <span>Bàn ủi</span>}</p>
                    <p className={styles.text}>Mô tả :{item.moTa}</p>
                    <h2>Giá thuê : ${item.giaTien}</h2>
                  </div>
                </div>

                <div className="ps-5 col-3 ">
                  <h2>Đặt phòng ngay</h2>
                  <table className={styles.text}>
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
                    <button className=" mt-1 btn btn-primary">Đặt phòng</button>
                  </table>
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
