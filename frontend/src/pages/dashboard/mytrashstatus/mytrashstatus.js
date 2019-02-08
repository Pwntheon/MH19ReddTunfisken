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
        return (
            <div className="my-trash-status">
                <Trashometer temp={this.getMyPercent()} />
                <div className="mini-stats">
                    <Pie {...this.state.myStatistics}></Pie>
                    <CO2Saved saved={0.22} />
                    <FlinkeBarn />
                </div>
            </div>
        );
    }
}

export default MyTrashStatus;