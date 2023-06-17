import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../../components/Loading/Loading";
import { getCommentsByRoom } from "../../../../../slices/commentSlice";
import { Row, Col, Rate } from "antd";
import { UserOutlined } from '@ant-design/icons';
import styles from "./CommentsRoom.module.scss";

function CommentsRoom({ idRoom }) {
  const dispatch = useDispatch();
  const { commentsByRoom, loadingCommentsByRoom } = useSelector(
    (state) => state.commentSlice
  );

   // eslint-disable-next-line 

  useEffect(() => {
    dispatch(getCommentsByRoom(idRoom));
  }, [idRoom]);

  if (loadingCommentsByRoom) {
    return <Loading />;
  }

  if(commentsByRoom.length === 0){
    return (
      <div className={styles.notComment}>
        <h1>NOT COMMENT</h1>
      </div>
    )
  }
  return (
    <div className={styles.wrapCommentsByRoom}>
      <Row gutter={[16, 16]}>
        {commentsByRoom.map((item, index) => (
          <Col key={index} span={6}>
            <div className={styles.comments}>
              <div className={styles.user}>
                {item.avatar ? (
                  <img src={item.avatar} alt={item.tenNguoiBinhLuan} />
                ) : (
                  <div className={styles.notAvatar}><UserOutlined /></div>
                )}

                <h6>{item.tenNguoiBinhLuan}</h6>
              </div>
              <div className={styles.content}>
                <p>{item.noiDung}</p>
              </div>
              <div className={styles.star}>
                <Rate defaultValue={item.saoBinhLuan} />
              </div>
              <div className={styles.date}>
                <p>{item.ngayBinhLuan}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CommentsRoom