import axiosClient from "./axiosClient";

class CommentApi {
  get = (postId) => {
    const url = `/posts/${postId}/comments`;
    return axiosClient.get(url);
  }

  create = (postId, _params) => {
    const url = `/posts/${postId}/comments`;
    const params = {
      comment: {
        body: _params.body
      }
    };
    return axiosClient.post(url, params);
  };

  edit = (postId, commentId, _params) => {
    const url = `/posts/${postId}/comments/${commentId}`;
    const params = {
      comment: {
        body: _params.body
      }
    };
    return axiosClient.put(url, params);
  };

  delete = (postId, commentId) => {
    const url = `/posts/${postId}/comments/${commentId}`;
    return axiosClient.delete(url);
  };
}

const commentApi = new CommentApi();
export default commentApi;