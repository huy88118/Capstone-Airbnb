import axios from "axios";

const fetcher = axios.create({
    baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
    headers: {
        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMzIiLCJIZXRIYW5TdHJpbmciOiIxNC8xMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE3MDI1MTIwMDAwMDAiLCJuYmYiOjE2ODUwMzQwMDAsImV4cCI6MTcwMjY1OTYwMH0.ONzcLkGLQUUqNsFAJM2fiGpfOKuEQFRFt4sOPGya_JQ"
    },
});

fetcher.interceptors.response.use(
    (response) => {
        return response.data.content
    },
    (error) => {
        return Promise.reject(error.response.data.content);
    }
);

fetcher.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("token")) || {};

        if(token){
            // config.headers.token = `Bearer ${token}`;
            config.headers.token = token;

        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default fetcher;