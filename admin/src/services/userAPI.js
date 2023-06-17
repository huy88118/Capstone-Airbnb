import fetch from "./fetcher";

const userAPI = {
    getUsers : () => {
        return fetch.get("users");
    },

    SearchUsers : (TenNguoiDung) => {
        return fetch.get(`users/search/${TenNguoiDung}`);
        
    },

    getUserById : (id) => {
        return fetch.get(`users/${id}`);
    },

    createUser: (values) => {
        return fetch.post("users", values)
    },

    uploadAvatar : (value) => {
        return fetch.post("users/upload-avatar", value);
    },

    editUser: (id,values) => {
        return fetch.put(`users/${id}`, values)
    },

    deleteUser: (id) => {
        return fetch.delete("users", {
            params: {
                id
            }
        })
    },
}

export default userAPI;
