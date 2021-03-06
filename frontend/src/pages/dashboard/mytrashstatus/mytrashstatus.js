import React, { Component } from 'react';
import Trashometer from './trashometer/trashometer';
import Pie from './pie/pie';
import CO2Saved from './co2saved/co2saved';
import FlinkeBarn from './flinkebarn/flinkebarn';

import './mytrashstatus.css';
import api from '../../../api/api';

class MyTrashStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myStatistics: {
                "foodWaste": 0,
                "plasticWaste": 0,
                "residualWaste": 0
            },
            districtStatistics: {
                "foodWaste": 0,
                "plasticWaste": 0,
                "residualWaste": 0
            },
            co2saved: {
                readableDistance :"0km",
                distanceInMeters: 2750,
                geographicDistanceDescription:"Det er lengre enn fra Oslo s til Majorstuen"
            }
        };

        this.getMyPercent = this.getMyPercent.bind(this);
        this.updateStats = this.updateStats.bind(this);
    }

    updateStats() {
        if(typeof this.props.household.district === 'undefined') return;
        api.getMyStatistics(this.props.household, this.props.authentication.accessToken)
            .then(r => r.json())
            .then(d => this.setState({ myStatistics: d }));
        api.getDistrictStatistics(this.props.household, this.props.authentication.accessToken)
            .then(r => r.json())
            .then(d => this.setState({ districtStatistics: d }));
    }

    componentDidMount() {
        this.refreshTimer = setInterval(this.updateStats, 1000);
        this.updateStats();
        setTimeout(() => {
            api.getMyBusDistance(this.props.household, this.props.authentication.accessToken)
            .then(r => r.json())
            .then(d => this.setState({co2saved: {...d}}));
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshTimer);
    }

    getMyPercent() {
        const {myStatistics, districtStatistics} = this.state;
        const myTotal = myStatistics.foodWaste + myStatistics.plasticWaste + myStatistics.residualWaste;
        const districtTotal =  districtStatistics.foodWaste + districtStatistics.plasticWaste + districtStatistics.residualWaste;
        return myTotal / districtTotal * 100;
    }
    render() {
        const {readableDistance, geographicDistanceDescription} = this.state.co2saved;
        const {points} = this.props.household;
        return (
            <div className="my-trash-status">
                <Trashometer temp={this.getMyPercent()} />
                <div className="mini-stats">
                    <Pie {...this.state.myStatistics}></Pie>
                    <CO2Saved saved={readableDistance} text={geographicDistanceDescription} />
                    <FlinkeBarn />
                </div>
                <div className="score">{points} miljøpoeng! {points !== 0 && "Godt jobba."} Neste premie på 1000 poeng.</div>
            </div>
        );
    }
}

export default MyTrashStatus;