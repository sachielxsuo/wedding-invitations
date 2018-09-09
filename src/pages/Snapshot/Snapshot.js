/**
 * Created by brickspert on 2016/12/31.
 */
/*快照页面*/
import React, {Component} from 'react';
import './Snapshot.scss';
import  Back from 'components/Back/Back';
import BgImg from '../../components/BgImg/BgImg';

const firstImg = require('asset/images/photos/snapshot/01.jpg');
const secondImg = require('asset/images/photos/snapshot/02.jpg');
const thirdImg = require('asset/images/photos/snapshot/03.jpg');
const fouthImg = require('asset/images/photos/snapshot/04.jpg');
const bgImg = require('./images/snapshot-bg.png');
export default class Snapshot extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="full-page snapshot-page">
                <BgImg src={bgImg} animate={false}/>
                <img src={firstImg} className="first-img photo"/>
                <img src={secondImg} className="second-img photo"/>
                <img src={thirdImg} className="third-img photo"/>
                <img src={fouthImg} className="fouth-img photo"/>
                <Back position={"back-left-top"}/>
            </div>
        );
    }
}