// application's entry

import React, {Component} from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import {Router, Route, IndexRoute, browserHistory, Link} from "react-router";
import DevTools from "./pages/DevTools/DevTools";
import getRoutes from "./router/router.js";
import initStore from "./config/store";

// const shareImg = require('asset/images/photos/share.jpg')

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;
const store = initStore();
render((
    <Provider store={store}>
        <div id="index-page-box">
            <Router history={browserHistory} routes={getRoutes(store)}/>
            {/*{devTools}*/}
        </div>
    </Provider>
), document.getElementById('app'));


// (function initShare(){
//     // const shareData = {
//     //     img_url: 'http://pem6058l4.bkt.clouddn.com/share1.jpg',
//     //     img_width: "128",
//     //     img_height: "193",
//     //     link: `http://${ window.location.host }/?t=${ userType }`,
//     //     desc: '我们结婚啦，欢迎来参加我们的婚礼',
//     //     title: document.title
//     // }

//     // document.addEventListener('WeixinJSBridgeReady', function() {
//     //     // 发送给朋友
//     //     WeixinJSBridge.on("menu:share:appmessage", shareFriends);

//     //     // 发送到朋友圈分享
//     //     WeixinJSBridge.on("menu:share:timeline", shareTimeline);
//     // });

//     // function shareFriends() {
//     //     WeixinJSBridge && WeixinJSBridge.invoke("sendAppMessage", shareData, function(b) {})
//     // }

//     // function shareTimeline() {
//     //     WeixinJSBridge && WeixinJSBridge.invoke("shareTimeline", shareData, function(b) {})
//     // }
//     wx.config({
//         // 配置信息, 即使不正确也能使用 wx.ready
//         debug: false,
//         appId: '',
//         timestamp: 1,
//         nonceStr: '',
//         signature: '',
//         jsApiList: []
//     });
//     wx.ready(()=> {
//         wx.updateAppMessageShareData({ 
//             title: '我们结婚啦', // 分享标题
//             desc: '欢迎来参加', // 分享描述
//             link: 'http://www.huangqingyuan.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//             imgUrl: 'http://pem6058l4.bkt.clouddn.com/share1.jpg', // 分享图标
//         }, function(res) { 
//         //这里是回调函数 
//         }); 

//         wx.onMenuShareTimeline({
//             title: '我们结婚啦1', // 分享标题
//             link: 'http://www.huangqingyuan.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//             imgUrl: 'http://pem6058l4.bkt.clouddn.com/share1.jpg', // 分享图标
//             success: function () {
//             // 用户点击了分享后执行的回调函数
//             }
//         })
//     });
// })()


