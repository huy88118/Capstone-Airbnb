import fetcher from "./fetcher";

const roomAPI = {
    getRoom: () => {
        return fetcher.get("phong-thue");
    },

    getRoomById: (id) => {
        return fetcher.get(`phong-thue/${id}`);
    },

    getRoomByLocation : (maViTri) => {
        return fetcher.get("/phong-thue/lay-phong-theo-vi-tri", {
            params: {
                maViTri
            }
        })
    },

    createRoom: (values) => {
        return fetcher.post("phong-thue", values);
    },

    updateRoom: (id,values) => {
        return fetcher.put(`phong-thue/${id}` , values);
    },

    deleteRoom: (id) => {
        return fetcher.delete(`phong-thue/${id}`);
    },

    uploadImgRoom : (id,values) => {
        return fetcher.post("phong-thue/upload-hinh-phong", values, {
            params: {
                maPhong: id,
            }
        });
    }
}

export default roomAPI;