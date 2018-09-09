/**
 * Created by brickspert on 2016/12/22.
 */
/*桌面*/
import React, {Component} from 'react';
import './Desktop.scss';
import {browserHistory} from 'react-router';
import {autoPlay} from 'util/audioAutoPlay';
import { boy, girl } from '../config';

const owner = userType == 'boy' ? boy : girl

import Bless from '../../components/Bless/Bless';
import BgImg from '../../components/BgImg/BgImg';

const bgImg = require('../../asset/images/photos/desktop-bg.png');
const iconImg = require('./images/icon.png');
const count1Img = require('./images/count-1.png');
const count2Img = require('./images/count-2.png');
const count3Img = require('./images/count-3.png');
const closeImg = require('./images/close.png');
const winneImg = require('./images/winne.png');

const audioMp3 = require('./audio/duang.mp3');
const audioOgg = require('./audio/duang.ogg');

const weddingTime = (function(time){
    const MONTH_CHINESE = ['一','二','三','四','五','六','七','八','九','十', '十一', '十二'];
    let month = MONTH_CHINESE[time.getMonth()];
    let date = time.getDate()
    date = date < 10 ? `0${ date }` : date;
    return {
        month, date
    }
})(owner.wedding.time)

let maskBoxTips = true //是否要弹出mask提示

// 是否展示红点
const redPoints = {
    dialing: true,
    wechat: true,
    photograph: true,
    map: true
}


/*底部热点区组件*/
class BottomHotSpot extends Component {
    constructor(props) {
        super(props);
        let name =  this.props.name;

        this.state = {
            redpoint: redPoints[name]
        }
    }
    /*
     * count 新消息数量 可选为 1,2,3
     * animateType 动画类型 可选 1，2
     * left 热点区离左边的距离 例如 12px
     * */
    _getCountImg(count) {
        switch (count) {
            case 1:
                return count1Img;
            case 2:
                return count2Img;
            case 3:
                return count3Img;
        }
    }

    _redirectToUrl(url) {
        redPoints[this.props.name] = false
        this.setState({
            redpoint: false
        })
        browserHistory.push({
            pathname: url
        });
    }

    render() {
        const redpoint = this.state.redpoint;
        const countImg = this._getCountImg(this.props.count);
        const redPointClassName = this.props.animateType ? `red-point  red-point-animate-${this.props.animateType}` : `red-point`;
        return (
            <div className="bottom-hot-spot" style={{left: this.props.left}}
                 onClick={()=>this._redirectToUrl(this.props.toUrl)}>
                {
                    redpoint ? <img className={redPointClassName} src={countImg}/> : ''
                }
            </div>
        )
    };
}
/*头部热点区组件*/
class TopHotSpot extends Component {
    /*
     * topText 头部文字
     * middleText 中间文字
     * bottomText 下部文字
     * */
    render() {
        const topText = this.props.topText;
        const middleText = this.props.middleText;
        const bottomText = this.props.bottomText;
        return (
            <div className="top-hot-spot" style={{left: this.props.left}} onClick={()=>this.props.click()}>
                {topText ?
                    <div className="top-text">{topText}</div>
                    :
                    ''
                }
                {middleText ?
                    <div className="middle-text">{middleText}</div>
                    :
                    ''
                }
                {bottomText ?
                    <div className="bottom-text">{bottomText}</div>
                    :
                    ''
                }
            </div>
        )
    };
}
export default class Desktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoShow: false,
            blessShow: false,
            maskBoxTips: maskBoxTips,
            maskBoxClassName: 'mask-box'
        }
    }

    _openVideo() {
        this.setState({
            videoShow: true
        });
    }

    _closeVideo() {
        this.setState({
            videoShow: false
        });
    }

    _openBless() {
        this.setState({
            blessShow: true
        });
    }

    _closeBless() {
        this.setState({
            blessShow: false
        });
    }

    _redirectToUrl(url) {
        browserHistory.push({
            pathname: url
        });
    }

    _handleMask(){
        maskBoxTips = false
        this.setState({
            maskBoxClassName: 'mask-box mask-box-enter mask-box-leave'
        })
        setTimeout(()=>{
            this._redirectToUrl('/integrated')
        }, 2000)
    }

    componentDidMount() {
        autoPlay('desktop-audio');
        setTimeout(()=>{
            this.setState({
                maskBoxClassName: 'mask-box mask-box-enter'
            })
        }, 500)
    }

    render() {
        const {maskBoxTips, maskBoxClassName} = this.state;
        return (
            <div className="full-page desktop-page">
                {
                    maskBoxTips ?
                        <div className="mask">
                            <div className={maskBoxClassName} onClick={this._handleMask.bind(this)}>
                                <img src={winneImg} />
                                <p className="mask-text">点我点我！</p>
                            </div>
                        </div>
                        :
                        ''
                }
                {/*背景照片*/}
                <BgImg src={bgImg} animate={true}/>
                <div className="bg">
                    <div className="white-bottom"></div>
                    <img src={iconImg} className="icon"/>
                    {/*上部热定区*/}
                    <TopHotSpot left="27px" topText={weddingTime.month + '月'}
                                middleText={weddingTime.date} bottomText={'日期'}
                                click={()=>this._redirectToUrl('/integrated')}/>
                    <TopHotSpot left="180px" bottomText={'视频'} click={()=>this._openVideo()}/>
                    <TopHotSpot left="332px" bottomText={'相册'} click={()=>this._redirectToUrl('/photos')}/>
                    <TopHotSpot left="485px" bottomText={'祝福'} click={()=>this._openBless()}/>
                    {/*下部热点区*/}
                    <BottomHotSpot name="dialing" count={2} left="27px" animateType={2} toUrl={'/dialing'}/>
                    <BottomHotSpot name="wechat" count={1} left="180px" animateType={2} toUrl={'/wechat'}/>
                    <BottomHotSpot name="photograph" count={3} left="332px" animateType={1} toUrl={'/photograph'}/>
                    <BottomHotSpot name="map" count={1} left="485px" toUrl={'/map'}/>
                </div>
                <audio className="hidden" autoPlay id="desktop-audio">
                    <source src={audioOgg} type="audio/ogg"/>
                    <source src={audioMp3} type="audio/mpeg"/>
                </audio>

                {/*视频*/}
                {this.state.videoShow ?
                    <div className='video' onClick={()=>this._closeVideo()}>
                        <img src={closeImg} className="close" onClick={()=>this._closeVideo()}/>
                        <iframe src="https://v.qq.com/iframe/player.html?vid=u078274yvog&tiny=0&auto=0"
                                onClick={(e)=>e.preventDefault()}></iframe>
                    </div>
                    :
                    ''
                }
                {/*祝福*/}
                {this.state.blessShow ?
                    <Bless close={()=> this._closeBless()}/>
                    : ''
                }
            </div>
        );
    }
}