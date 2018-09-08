// application's entry

import React, {Component} from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import {Router, Route, IndexRoute, browserHistory, Link} from "react-router";
import DevTools from "./pages/DevTools/DevTools";
import getRoutes from "./router/router.js";
import initStore from "./config/store";

const shareImg = require('asset/images/photos/share.jpg')

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


(function initShare(){
    const shareData = {
        img_url: shareImg,
        img_width: "128",
        img_height: "193",
        link: `http://${ window.location.host }/?t=${ userType }`,
        desc: '我们结婚啦，欢迎来参加我们的婚礼',
        title: document.title
    }

    document.addEventListener('WeixinJSBridgeReady', function() {
        // 发送给朋友
        WeixinJSBridge.on("menu:share:appmessage", shareFriends);

        // 发送到朋友圈分享
        WeixinJSBridge.on("menu:share:timeline", shareTimeline);
    });

    function shareFriends() {
        WeixinJSBridge && WeixinJSBridge.invoke("sendAppMessage", shareData, function(b) {})
    }

    function shareTimeline() {
        WeixinJSBridge && WeixinJSBridge.invoke("shareTimeline", shareData, function(b) {})
    }
})()


