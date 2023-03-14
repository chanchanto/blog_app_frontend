import axiosClient from "./axiosClient";

const AUTH_URL = '/users'

class AuthApi {
  login = (_params) => {
    const url = AUTH_URL + '/sign_in';
    const params = {
      api_v1_user: {
        email: _params.email,
        password: _params.password
      }
    };
    return axiosClient.post(url, params);
  }

  signup = (_params) => {
    const url = AUTH_URL;
    const params = {
      api_v1_user: {
        email: _params.email,
        password: _params.password,
        password_confirmation: _params.password_confirmation
      }
    };
    return axiosClient.post(url, params);
  }

  logout = () => {
    const url = AUTH_URL + '/sign_out';
    return axiosClient.delete(url);
  }
}

const authApi = new AuthApi();
export default authApi;