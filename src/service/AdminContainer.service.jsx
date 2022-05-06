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
}
export default AdmniContainer;