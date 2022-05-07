import React, {Component} from "react";
import axios, {} from 'axios'
class AdmniContainer extends Component{
    constructor(){
        super();
        const url = 'http://localhost:5000/api/';
        this.apiUrl = url;
    }

    async get(url){
        const rs = await axios.get(this.apiUrl + url);
        console.log(rs);
        return rs;
    }
    
    async update(url, data){
        const rs = await axios.put(this.apiUrl + url + '/update', data);
        return rs;
    }

    async getById(url){
        const rs = await axios.get(this.apiUrl + url);
        return rs;
    }

    async delete(url, data){
        const rs = await axios.delete(this.apiUrl + url, data);
        return rs;
    }

    async create(url, data){
        const rs = await axios.post(this.apiUrl + url, data);
        return rs;
    }
}
export default AdmniContainer;