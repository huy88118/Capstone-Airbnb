import fetcher from "./fetcher";

const authAPI = {
    login: (values) => {
        return fetcher.post("auth/signin", values);
    },

    register: (values) => {
        return fetcher.post("auth/signup", values);
    },
}

export default authAPI;