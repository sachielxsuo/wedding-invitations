/**
 * Created by brickspert on 2016/12/25.
 */
/*地图页面*/
import React, {Component} from 'react';
import './Map.scss';
import {browserHistory} from 'react-router';
import { boy, girl } from '../config';

const owner = userType == 'boy' ? boy : girl

const location = owner.wedding.location;

const hertImg = require('./images/hert.png');
const closeImg = require('./images/close.png');
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var point = new BMap.Point(location.pos.lon, location.pos.lat),
            title = location.address;


        var mapElement = document.getElementById('map');
        mapElement.style.zoom = 640 / parseInt(window.screen.width);
        var map = new BMap.Map("map");    // 创建Map实例
        map.centerAndZoom(point, 16);  // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity(location.city);          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        /*地图颜色*/
        var styleJson = [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": {
                    "hue": "#007fff",
                    "saturation": 89
                }
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#ffffff"
                }
            }
        ]
        map.setMapStyle({styleJson: styleJson});

        /*地图上的小狐心*/
        var pt = point;
        var myIcon = new BMap.Icon(hertImg, new BMap.Size(40, 40));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中

        /*信息框*/
        var infoWindow = new BMapLib.SearchInfoWindow(map, location.remark, {
            title: title, //标题
            width: 290, //宽度
            height: 40, //高度
            panel: "panel", //检索结果面板
            enableAutoPan: true, //自动平移
            searchTypes: []
        });
        infoWindow.open(point);
    }

    _goBack() {
        browserHistory.goBack(-1);
    }

    render() {
        return (
            <div className="full-page map-page">
                <img src={closeImg} className="close" onClick={()=>this._goBack()}/>
                <div id="map" className="map"></div>
            </div>
        )
    }
}