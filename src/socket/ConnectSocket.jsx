import React from "react";
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
class ConnectSocket extends React.Component {
    constructor(props) {
        super(props)
        let stompjs;
        this.state = {
            stompjs: stompjs,
        }
    }

    register() {
        const sockjs = new SockJS('https://wsocketlong.herokuapp.com/websocket')
        this.state.stompjs = over(sockjs);
        this.state.stompjs.connect({}, () => {
            this.state.stompjs.subscribe('/user/3/private', (payload) => {
                console.log(payload);
            })
        }, (e) => {
            console.log(e);
        });
        console.log(this.state.stompjs);
        this.setState({
            stompjs: over(sockjs),
        })
    }
    sendOrder( data) {
        this.state.stompjs.send('/app/private-message/3', {},
            JSON.stringify(data))
    }
}

export default ConnectSocket;