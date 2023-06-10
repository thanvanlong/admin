// import React from "react";
// import { over } from 'stompjs'
// import SockJS from 'sockjs-client'
// import {setUser} from '../store/Module.action'
// class ConnectSocket extends React.Component {
//     constructor(props) {
//         super(props)
//         let stompjs;
//         this.state = {
//             data: {},
//         }
//     }
//
//     register() {
//         const sockjs = new SockJS('https://wsocketlong.herokuapp.com/websocket')
//         this.state.stompjs = over(sockjs);
//         this.state.stompjs.connect({}, () => {
//             this.state.stompjs.subscribe('/user/3/private', (payload) => {
//             //    console.log(JSON.parse(payload.body));
//             //    this.setState({
//             //        data: JSON.parse(payload.body)
//             //    })
//                 this.storeToRedux(payload.body)
//             })
//         }, (e) => {
//             console.log(e);
//         });
//         console.log(this.state.stompjs);
//         this.setState({
//             stompjs: over(sockjs),
//         })
//     }
//     sendOrder( data) {
//         this.state.stompjs.send('/app/private-message/3', {},
//             JSON.stringify(data))
//     }
//
//     storeToRedux(data){
//         const {dispatch} = this.props;
//         dispatch(setUser(data))
//     }
// }
//
// export default ConnectSocket;
