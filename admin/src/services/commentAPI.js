import fetcher from "./fetcher";

const commentsAPI = {
    getComments : () => {
        return fetcher.get("binh-luan");
    },

    getCommentsByRoom : (id) => {
        return fetcher.get(`binh-luan/lay-binh-luan-theo-phong/${id}`)
    },

    createComment : (values) => {
        return fetcher.post("binh-luan", values);
    },

    updateComment : (id, values) => {
        return fetcher.put(`binh-luan/${id}`, values);
    },

    deleteComment: (id) => {
        return fetcher.delete(`binh-luan/${id}`);
    }
}

export default commentsAPI;