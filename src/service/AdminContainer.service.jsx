import React, { Component } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode'
class AdminContainer extends Component {
  constructor() {
    super();
    const url = "http://14.225.205.30:8081/api/v1/";
    this.apiUrl = url;
    this.axiosJwt = axios.create();
    this.axiosJwt.interceptors.request.use(
        async (config) => {
          let date = new Date();
          const decodedToken = jwt_decode(localStorage.getItem("USER"));
          console.log(decodedToken)
          if (decodedToken.exp < date.getTime() / 1000) {
            const data = await this.refreshToken();
            this.state = {
              token: data.data.access_token,
            }
            config.headers['Authorization'] = 'Bearer ' + data?.data?.access_token
          } else {
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("USER");
            console.log('Bearer ' + localStorage.getItem("USER"));
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
    )
  }

  async get(url) {
    const rs = await this.axiosJwt.get(this.apiUrl + url);
    console.log(rs);
    return rs.data;
  }

  async update(url, data) {
    const rs = await axios.put(this.apiUrl + url + "/update", data);
    return rs;
  }

  async getById(url) {
    const rs = await this.axiosJwt.get(this.apiUrl + url);
    return rs.data;
  }

  async delete(url, data) {
    const rs = await axios.delete(this.apiUrl + url, {data: data});
    return rs;
  }

  async create(url, data) {
    const rs = await axios.post(this.apiUrl + url, data);
    return rs.data;
  }

  async getAllCategory() {
    const rs = await axios.get(this.apiUrl + "category/get");
    return rs.data;
  }
}
export default AdminContainer;
