import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import { getComments } from "../../../../../slices/commentSlice";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

import styles from "./Comments.module.scss";
import commentsAPI from "../../../../../services/commentAPI";

function Comments() {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.commentSlice);

  const [deleteComment, setdeleteComment] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    dispatch(getComments());
  }, [deleteComment]);

  const deletedComment = (id) => {
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
            await commentsAPI.deleteComment(id);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setdeleteComment(!deleteComment);
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

  //Form
  const { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: {
      maPhong: "",
      maNguoiBinhLuan: "",
      ngayBinhLuan: "",
      noiDung: "",
      saoBinhLuan: 0,
    },
  });
  const { errors } = formState;

  const onSubmit = async (values) => {
    try {
      await commentsAPI.updateComment(values.id, values);
      dispatch(getComments());
      setSelectedIndex(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedEdit = (values, index) => {
    setSelectedIndex(index);

    for (let key in values) {
      setValue(key, values[key]);
    }
  };

  // Table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Room Code",
      dataIndex: "roomCode",
      key: "roomCode",
    },
    {
      title: "Commenter Code",
      dataIndex: "commenterCode",
      key: "commenterCode",
    },
    {
      title: "Comment Date",
      dataIndex: "commentDate",
      key: "commentDate",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Star",
      dataIndex: "star",
      key: "star",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = comments.map((item, index) => {
    if (index === selectedIndex) {
      return {
        key: item.id,
        id: item.id,
        roomCode: (
          <div className={styles.input}>
            <input
              placeholder={errors.maPhong && `${errors.maPhong.message}`}
              type="text"
              {...register("maPhong", {
                required: {
                  value: true,
                  message: "Is required",
                },
                pattern: {
                  value: /^[1-9]|[0-9]{2,}$/,
                  message: " integer and < 0",
                },
              })}
            />
          </div>
        ),
        commenterCode: (
          <div className={styles.input}>
            <input
              type="text"
              placeholder={
                errors.maNguoiBinhLuan && `${errors.maNguoiBinhLuan.message}`
              }
              {...register("maNguoiBinhLuan", {
                required: {
                  value: true,
                  message: "Is required",
                },
                pattern: {
                  value: /^[1-9]|[0-9]{2,}$/,
                  message: " integer and < 0",
                },
              })}
            />
          </div>
        ),
        commentDate: (
          <div className={styles.input}>
            <input
              placeholder={
                errors.ngayBinhLuan && `${errors.ngayBinhLuan.message}`
              }
              {...register("ngayBinhLuan", {
                required: {
                  value: true,
                  message: "Is required",
                },
              })}
            />
          </div>
        ),
        content: (
          <div className={styles.input}>
            <input
              placeholder={errors.noiDung && `${errors.noiDung.message}`}
              {...register("noiDung", {
                required: {
                  value: true,
                  message: "Is required",
                },
              })}
            />
          </div>
        ),
        star: (
          <div className={styles.input}>
            <input
              placeholder={
                errors.saoBinhLuan && `${errors.saoBinhLuan.message}`
              }
              type="number"
              {...register("saoBinhLuan", {
                required: {
                  value: true,
                  message: "required and number",
                },
                pattern: {
                  value: /^[0-5]$/,
                  message: " from 0 to 5",
                },
              })}
            />
          </div>
        ),
        action: (
          <div className={styles.actionEdit}>
            <div className={styles.saveEdit} onClick={handleSubmit(onSubmit)}>
              Save
            </div>
            <div
              className={styles.cancelEdit}
              onClick={() => setSelectedIndex(null)}
            >
              Cancel
            </div>
          </div>
        ),
      };
    }
    return {
      key: item.id,
      id: item.id,
      roomCode: item.maPhong,
      commenterCode: item.maNguoiBinhLuan,
      commentDate: item.ngayBinhLuan,
      content: item.noiDung,
      star: item.saoBinhLuan,
      action: (
        <div className={styles.action}>
          <Tooltip placement="bottom" title="Edit">
            <div
              className={styles.iconEdit}
              onClick={() => handleSelectedEdit(item, index)}
            >
              <EditOutlined />
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
            <div
              className={styles.iconDelete}
              onClick={() => deletedComment(item.id)}
            >
              <DeleteOutlined />
            </div>
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    <div className={styles.wrapComments}>
      {/* Header Users */}
      <div className={styles.headerComments}>
        <h3>Comments</h3>
        <div className={styles.search}>
          <input type="text" placeholder="Search" />
          <SearchOutlined />
        </div>
      </div>

      {/* Table Users */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            size="middle"
            pagination={{
              position: ["bottomCenter"],
            }}
          />
        </form>
      </div>
    </div>
  );
};
export default Comments