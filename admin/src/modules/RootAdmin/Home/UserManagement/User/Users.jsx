import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserAction, getUser } from "../../../../../slices/userSlice";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Table, Modal, Tooltip } from "antd";
import Swal from "sweetalert2";
import userAPI from "../../../../../services/userAPI";
import { useNavigate } from "react-router-dom";

import styles from "./Users.module.scss";
import EditUser from "../EditUser";
import { handleModalEditUser } from "../../../../../slices/modalSlice";
import Loading from "../../../../../components/Loading/Loading";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading } = useSelector((state) => state.userSlice);
  const { modalEditUser } = useSelector((state) => state.modalSlice);

  const [searchTerm, setSearchTerm] = useState(null);
  const [deletedUser, setDeletedUser] = useState(false);
  const [idUser, setIdUser] = useState(null);

  const timeoutRef = useRef();

  const handleSearchUser = (evt) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      (async () => {
        try {
          if (!evt.target.value) {
            setSearchTerm(users);
          }
          const data = await userAPI.SearchUsers(evt.target.value);
          setSearchTerm(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }, 300);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [deletedUser]);

  //Modal
  const showModal = (id) => {
    dispatch(handleModalEditUser());
    setIdUser(id);
  };

  const handleCancel = () => {
    dispatch(handleModalEditUser());
    setIdUser(null);
    dispatch(deleteUserAction());
  };

  // Delete
  const deleteUser = (id) => {
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
            await userAPI.deleteUser(id);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setDeletedUser(!deletedUser);
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

  // Table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = (searchTerm ? searchTerm : users).map((user, index) => {
    return {
      key: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      gender: `${user.gender}`,
      role: user.role,
      action: (
        <div className={styles.action}>
          <Tooltip placement="bottom" title="Edit">
            <div className={styles.iconEdit} onClick={() => showModal(user.id)}>
              <EditOutlined />
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
            <div
              className={styles.iconDelete}
              onClick={() => deleteUser(user.id)}
            >
              <DeleteOutlined />
            </div>
          </Tooltip>

          <Tooltip placement="bottom" title="Detail">
            <div
              className={styles.iconDetailUser}
              onClick={() => navigate(`/admin/users/${user.id}`)}
            >
              <ContactsOutlined />
            </div>
          </Tooltip>
        </div>
      ),
    };
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapUsers}>
    {/* Header Users */}
    <div className={styles.headerUser}>
      <h4>USERS</h4>
      <div className={styles.search}>
        <input
          ref={timeoutRef}
          type="text"
          placeholder="Search users"
          onChange={handleSearchUser}
        />
        <SearchOutlined />
      </div>
    </div>

    {/* Table Users */}
    <Table
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      size="middle"
      pagination={{
        position: ["bottomCenter"],
      }}
    />

    {/* Modal */}
    <Modal
      title="Editing user"
      open={modalEditUser}
      footer={null}
      onCancel={handleCancel}
      width={1000}
    >
      <EditUser idUser={idUser} />
    </Modal>
  </div>
);
};

export default Users