import axiosClient from "./axiosClient";

class PostApi {
  getAll = (params) => {
    const url = `/posts`;
    return axiosClient.get(url, { params });
  };

  get = (id) => {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  }
}

const postApi = new PostApi();
export default postApi;