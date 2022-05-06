import React, {Component} from "react";
import axios, {} from 'axios'
class AdmniContainer extends Component{
    constructor(){
        super();
        const url = 'https://0f02-2402-9d80-24b-911a-8402-bdd-5e12-a27f.ngrok.io/api/';
        this.apiUrl = url;
    }

    async getAll(url){
        const rs = await axios.get(this.apiUrl + url);
        console.log(rs);
        return rs;
    }
}
export default AdmniContainer;