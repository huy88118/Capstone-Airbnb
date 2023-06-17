import React, { useState, useEffect } from "react";
import { apiGetLocations } from "../../../apis/locationAPI";
import styles from "./ShowRoom.module.scss";

function ShowRoom({ id }) {
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
    <div>
      {locations.map((item) => {
        if (item.id.toString() === id) {
          return (
            <div>
              <img
                key={item.id}
                src={item.hinhAnh}
                className={styles.bannerImg}
              />
              <p className={styles.bannerText}>{item.tinhThanh}</p>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ShowRoom;
