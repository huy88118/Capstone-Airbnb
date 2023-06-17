import fetcher from "./fetcher";

const locationsAPI = {
    getLocations : () => {
        return fetcher.get("vi-tri");
    },

    getLocationById : (id) => {
        return fetcher.get(`vi-tri/${id}`);
    },

    createLocation : (values) => {
        return fetcher.post("vi-tri", values);
    },
    
    updateLocation : (id,values) => {
        return fetcher.put(`vi-tri/${id}`, values);
    },

    deleteLocation : (id) => {
        return fetcher.delete(`vi-tri/${id}`);
    },

    uploadImgLocation : ( id, formFile ) => {
        return fetcher.post("vi-tri/upload-hinh-vitri", formFile,{
            params: {
                maViTri: id,
            }
        })
    }
}

export default locationsAPI;