import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms, setRoomNull } from "../../../../../slices/roomSlice";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Table, Modal, Image, Tooltip } from "antd";
import Swal from "sweetalert2";
import roomAPI from "../../../../../services/RoomAPI";
import {
  handleModalAddImgRoom,
  handleModalCommentsRoom,
  handleModalEditRoom,
} from "../../../../../slices/modalSlice";
import EditRoom from "../EditRoom/EditRoom";
import AddImgRoom from "../AddImgRoom/AddImgRoom";

import styles from "./Room.module.scss";
import { getLocations } from "../../../../../slices/locationSlice";
import Loading from "../../../../../components/Loading/Loading";
import CommentsRoom from "../CommentsRoom/CommentsRoom";

function Rooms()  {
  const dispatch = useDispatch();

  // State
  const { rooms, loading } = useSelector((state) => state.roomSlice);
  const { modalEditRoom, modalAddImgRoom, modalCommentsRoom } = useSelector(
    (state) => state.modalSlice
  );
  const { locations, loading: loadingLocation } = useSelector(
    (state) => state.locationSlice
  );

  const [deletedRoom, setDeletedRoom] = useState(false);
  const [idRoom, setIdRoom] = useState(null);
  const [searchRoom, setSearchRoom] = useState(null);

  useEffect(() => {
    dispatch(getRooms());
  }, [deletedRoom]);

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  //Modal
  const showModalAddImg = (id) => {
    dispatch(handleModalAddImgRoom());
    setIdRoom(id);
  };
  const handleCancelAddImg = () => {
    dispatch(handleModalAddImgRoom());
    setIdRoom(null);
  };

  const showModalEditRoom = (id) => {
    dispatch(handleModalEditRoom());
    setIdRoom(id);
  };
  const handleCancelEditRoom = () => {
    dispatch(handleModalEditRoom());
    setIdRoom(null);
    dispatch(setRoomNull());
  };

  const showModalCommentsRoom = (id) => {
    dispatch(handleModalCommentsRoom());
    setIdRoom(id);
  };
  const handleCancelCommentsRoom = () => {
    dispatch(handleModalCommentsRoom());
    setIdRoom(null);
    dispatch(setRoomNull());
  };

  // Delele room
  const deleteRoom = (id) => {
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
            await roomAPI.deleteRoom(id);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setDeletedRoom(!deletedRoom);
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

  //SearchRoom
  const hanleSearchRoom = async (evt) => {
    if (!evt.target.value) {
      setSearchRoom(rooms);
      return;
    }

    try {
      const data = await roomAPI.getRoomByLocation(evt.target.value);
      setSearchRoom(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
    },
    {
      title: "Rooms of house",
      dataIndex: "roomsOfHose",
      key: "roomsOfHose",
      width: 130,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 55,
    },
    {
      title: "Location Code",
      dataIndex: "locationCode",
      key: "locationCode",
      width: 130,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Utilities",
      dataIndex: "utilities",
      key: "utilities",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 60,
    },
  ];

  const dataSource = (searchRoom ? searchRoom : rooms).map((item) => {
    return {
      key: item.id,
      id: item.id,
      name: item.tenPhong,
      roomsOfHose: (
        <div className={styles.roomsOfHose}>
          <p>Bedroom: {item.phongNgu}</p>
          <p>Bed: {item.giuong}</p>
          <p>Bathroom: {item.phongTam}</p>
        </div>
      ),
      price: `${item.giaTien} $`,
      locationCode: item.maViTri,
      image: item.hinhAnh ? (
        <Image
          // width={200}
          src={item.hinhAnh}
          alt={item.tenPhong}
        />
      ) : (
        <div
          className={styles.addImgRoom}
          onClick={() => showModalAddImg(item.id)}
        >
          <div className={styles.iconAddImg}>
            <Tooltip placement="bottom" title="Add Image">
              <FileImageOutlined />
            </Tooltip>
          </div>
          <p>Add image</p>
        </div>
      ),
      utilities: (
        <div>
          {item.maygiac ? <span>washing machine, </span> : ""}
          {item.banla ? <span>iron, </span> : ""}
          {item.tive ? <span>television, </span> : ""}
          {item.dieuHoa ? <span>air codition, </span> : ""}
          {item.wifi ? <span>wifi, </span> : ""}
          {item.bep ? <span>kitchen, </span> : ""}
          {item.doXe ? <span>parking, </span> : ""}
          {item.hoBoi ? <span>pool, </span> : ""}
        </div>
      ),
      description: item.moTa,
      action: (
        <div className={styles.action}>
          <Tooltip placement="left" title="Edit">
            <div
              className={styles.iconEdit}
              onClick={() => showModalEditRoom(item.id)}
            >
              <EditOutlined />
            </div>
          </Tooltip>
          <Tooltip placement="left" title="Delete">
            <div
              className={styles.iconDelete}
              onClick={() => deleteRoom(item.id)}
            >
              <DeleteOutlined />
            </div>
          </Tooltip>
          <div
            className={styles.iconComment}
            onClick={() => showModalCommentsRoom(item.id)}
          >
            <Tooltip placement="left" title="Comments">
              <CommentOutlined />
            </Tooltip>
          </div>
        </div>
      ),
    };
  });

  if (loadingLocation) {
    return <Loading />;
  }

  return (
    <div>
    <div className={styles.headerRoom}>
      {/* Header Users */}
      <div className={styles.headerRoom}>
        <h4>ROOMS</h4>
        <div className={styles.search}>
          <select
            type="text"
            placeholder="Search rooms"
            onChange={hanleSearchRoom}
          >
            <option value="">All room</option>
            {locations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.tenViTri}
              </option>
            ))}
          </select>
          <SearchOutlined />
        </div>
      </div>

      {/* Table */}
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        size="small"
        pagination={{
          position: ["bottomCenter"],
        }}
        scroll={{
          y: 535,
        }}
      />

      {/* Modal */}
      <Modal
        title={`Add image - Room id ${idRoom}`}
        open={modalAddImgRoom}
        width={1000}
        style={{ top: 20 }}
        footer={null}
        onCancel={handleCancelAddImg}
      >
        <AddImgRoom idRoom={idRoom} />
      </Modal>

      {/* Modal Edit Room */}
      <Modal
        title={`Edit - Room  id ${idRoom}`}
        open={modalEditRoom}
        width={1000}
        style={{ top: 20 }}
        footer={null}
        onCancel={handleCancelEditRoom}
      >
        <EditRoom idRoom={idRoom} />
      </Modal>

      {/* Modal Comments room */}
      <Modal
        title={`Comment - Room id ${idRoom}`}
        open={modalCommentsRoom}
        width={1000}
        style={{ top: 20 }}
        footer={null}
        onCancel={handleCancelCommentsRoom}
      >
        <CommentsRoom idRoom={idRoom} />
      </Modal>
    </div>
  </div>
);
};
export default Rooms