import axiosClient from "./axiosClient";

const POST_URL = '/posts'

class PostApi {
  getAll = (params) => {
    const url = POST_URL;
    return axiosClient.get(url, { params });
  };

  get = (id) => {
    const url = `${POST_URL}/${id}`;
    return axiosClient.get(url);
  }

  create = (_params) => {
    const url = POST_URL;
    console.log(_params);
    const params = {
      post: {
        title: _params.title,
        content: _params.content,
        tags: _params.tags,
      }
    };
    console.log(params);
    return axiosClient.post(url, params);
  };
}

const postApi = new PostApi();
export default postApi;