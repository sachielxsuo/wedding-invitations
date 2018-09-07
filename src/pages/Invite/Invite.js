/**
 * Created by brickspert on 2016/12/31.
 */
/*邀请页面*/
import React, {Component} from 'react';
import './Invite.scss';
import  Back from 'components/Back/Back';
import BgImg from '../../components/BgImg/BgImg';
const bgImg = require('../../asset/images/photos/invite-bg.jpg');

import { boy, girl } from '../config';

const owner = userType == 'boy' ? boy : girl

const weddingTime = (function(time) {
    const WEEK_CHINESE = ['日','一','二','三','四','五','六'];
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const day = WEEK_CHINESE[time.getDay()];
    const hour = time.getHours();
    const minutes = time.getMinutes();

    function fill(num) {
        return (num < 10 ? '0' : '') + num;
    }

    return {
        dateStr: `${ year }年${ month }月${ date }日`,
        timeStr: `${ fill(hour) }:${ fill(minutes) }`,
        weekStr: `星期${ day }`
    }
})(owner.wedding.time)

export default class Call extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="full-page invite-page">
                {/*背景照片*/}
                <BgImg src={bgImg} animate={true}/>
                <div className="text-box">
                    <div className="text-title">
                        <p className="english">Our invitation</p>
                        <p>{boy.name} & {girl.name}的邀约</p>
                    </div>
                    <div className="text-content">
                        <p>各位亲朋好友：</p>
                        <p>诚挚邀请您于{weddingTime.dateStr}，{weddingTime.weekStr}，{weddingTime.timeStr}参加{boy.name}和{girl.name}的结婚典礼。</p>
                        <p>您的到来是对我们最好的祝福，敬备喜宴，恭请光临。</p>
                    </div>
                </div>
                <Back position={"back-left-top"}/>
            </div>
        )
    }
}