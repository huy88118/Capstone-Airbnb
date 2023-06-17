import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Table, Modal, Image, Tooltip } from "antd";
import {
  getLocationById,
  getLocations,
} from "../../../../../slices/locationSlice";
import Swal from "sweetalert2";
import locationsAPI from "../../../../../services/locationsAPI";

import styles from "./Locations.module.scss";
import EditLocation from "../EditLocation/EditLocation";
import {
  handleModalAddImgLocation,
  handleModalEditLocation,
} from "../../../../../slices/modalSlice";
import AddImgLocation from "../AddImgLocation/AddImgLocation";

function Locations() {
  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state) => state.locationSlice);
  const { modalEditLocation, modalAddImgLocation } = useSelector(
    (state) => state.modalSlice
  );

  const [deletedLocation, setDeletedLocation] = useState(false);
  const [idLocation, setIdLocation] = useState(null);

  useEffect(() => {
    dispatch(getLocations());
  }, [deletedLocation]);

  const deleteLocation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await locationsAPI.deleteLocation(id);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setDeletedLocation(!deletedLocation);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          }
        })();
      }
    });
  };

  //Modal
  const showModal = (id) => {
    dispatch(handleModalAddImgLocation());

    setIdLocation(id);
  };

  const handleCancel = () => {
    dispatch(handleModalAddImgLocation());

    setIdLocation(null);
  };

  // Search
  const handleSearch = (evt) => {
    if (evt.key !== "Enter") return;

    dispatch(getLocationById(evt.target.value));
  };

  //Table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Location Name",
      dataIndex: "locationName",
      key: "locationName",
    },
    {
      title: "Province Name",
      dataIndex: "provinceName",
      key: "provinceName",
    },
    {
      title: "Country Name",
      dataIndex: "countryName",
      key: "countryName",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
  ];

  const dataSource = locations.map((item) => {
    return {
      key: item.id,
      id: item.id,
      locationName: item.tenViTri,
      provinceName: item.tinhThanh,
      countryName: item.quocGia,
      image: item.hinhAnh ? (
        <div className={styles.imgLocation}>
          <Image src={item.hinhAnh} width={200} />
        </div>
      ) : (
        <div
          className={styles.addImgLocation}
          onClick={() => showModal(item.id)}
        >
          <div className={styles.iconAddImg}>
            <FileImageOutlined />
          </div>
          <p>Add image</p>
        </div>
      ),
      action: (
        <div className={styles.action}>
          <Tooltip placement="bottom" title="Edit">
            <div
              className={styles.iconEdit}
              onClick={() => dispatch(handleModalEditLocation(item))}
            >
              <EditOutlined />
            </div>
          </Tooltip>

          <Tooltip placement="bottom" title="Delete">
            <div
              className={styles.iconDelete}
              onClick={() => deleteLocation(item.id)}
            >
              <DeleteOutlined />
            </div>
          </Tooltip>
        </div>
      ),
    };
  });
  return (
    <div>
    <div className={styles.wrapLocations}>
      <div className={styles.headerLocations}>
        <h4>Locations</h4>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Fill out ID Location 'Enter' "
            onKeyDown={handleSearch}
          />
          <div className={styles.iconSearch}>
            <SearchOutlined />
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        size="middle"
        pagination={{
          position: ["bottomCenter"],
        }}
        scroll={{
          y: 530,
        }}
      />

      {/* Modal add image location*/}
      <Modal
        title="Adding image"
        open={modalAddImgLocation}
        width={1000}
        style={{ top: 20 }}
        footer={null}
        onCancel={handleCancel}
      >
        <AddImgLocation idLocation={idLocation} />
      </Modal>

      {/* Modal edit Location*/}
      <Modal
        title="Editing location"
        open={modalEditLocation}
        width={1000}
        style={{ top: 20 }}
        footer={null}
        onCancel={() => dispatch(handleModalEditLocation())}
      >
        <EditLocation />
      </Modal>
    </div>
  </div>
);
};

export default Locations