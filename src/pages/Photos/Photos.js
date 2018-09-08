/**
 * Created by brickspert on 2016/12/27.
 */
import React, {Component} from 'react';
import './Photos.scss';
import {browserHistory} from 'react-router';
import Back from '../../components/Back/Back';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const leftImg = require('./images/left.png');
const rightImg = require('./images/right.png');

const photos = [{
        src: require('../../asset/images/photos/photos/01.jpg'),
        horizontal: false
    }, {
        src: require('../../asset/images/photos/photos/02.jpg'),
        horizontal: false
    }, {
        src: require('../../asset/images/photos/photos/03.jpg'),
        horizontal: false
    }, {
        src: require('../../asset/images/photos/photos/04.jpg'),
        horizontal: false
    }, {
        src: require('../../asset/images/photos/photos/05.jpg'),
        horizontal: false
    }, {
        src: require('../../asset/images/photos/photos/06.jpg'),
        horizontal: false
    }, {
        src: require('../../asset/images/photos/photos/07.jpg'),
        horizontal: false
    }, {
        src: require('../../asset/images/photos/photos/08.jpg'),
        horizontal: false
    }, {
        src: require('../../asset/images/photos/photos/09.jpg'),
        horizontal: false
    }, {
        src: require('../../asset/images/photos/photos/10.jpg'),
        horizontal: false
    }
]

const horizontalPhoto = {
    width: window.innerWidth,
    height: window.innerWidth / 1.5
}

const horizontalStyle = {
    height: horizontalPhoto.height + 'px',
    top: '50%',
    marginTop: (0 - horizontalPhoto.height / 2) + 'px'
}

export default class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //当前显示第几张照片
            currentIndex: 0,
            //每5S自动切换图片，如果手动切换了图片，则重置时间
            waitTime: 0,
            //动画向左还是向右边
            animate: 'photos-left'
        }
    }

    componentDidMount() {
        // this.photosInterval = setInterval(()=> {
        //     let waitTime = ++this.state.waitTime;
        //     if (waitTime == 5) {
        //         this.setState({
        //             currentIndex: ++this.state.currentIndex,
        //             waitTime: 0,
        //             /*每次自动滑动都是向左滑动*/
        //             animate: 'photos-left'
        //         });
        //     }
        // }, 1000);
        var startX, endX;
        document.getElementsByClassName('photos-page')[0].addEventListener('touchstart', (e)=> {
            startX = e.touches[0].pageX;
        });
        document.getElementsByClassName('photos-page')[0].addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].pageX;
            if (endX - startX > 50) {
                //alert('右滑动');
                var currentIndex = --this.state.currentIndex;
                if (currentIndex == -1) {
                    currentIndex = photos.length - 1;
                }
                this.setState({
                    currentIndex: currentIndex,
                    waitTime: 0,
                    animate: 'photos-right'
                });
            } else if (startX - endX > 50) {
                //alert('左滑动');
                this.setState({
                    currentIndex: ++this.state.currentIndex,
                    waitTime: 0,
                    animate: 'photos-left'
                });
            }
        });
    }

    componentWillUnmount() {
        this.photosInterval && clearInterval(this.photosInterval);
    }

    render() {
        const photo = photos[this.state.currentIndex % photos.length]
        return (
            <div className="full-page photos-page">
                <ReactCSSTransitionGroup
                    transitionName={this.state.animate}
                    transitionEnterTimeout={1}
                    transitionLeaveTimeout={200}
                >
                    <img className="photos" src={photo.src} style={photo.horizontal ? horizontalStyle : {}}
                         key={this.state.currentIndex}/>
                </ReactCSSTransitionGroup>
                <img src={leftImg} className="left-row row"/>
                <img src={rightImg} className="right-row row"/>
                <Back position={"back-left-top"}/>
            </div>
        )
    };
}