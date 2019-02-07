import React, { Component } from 'react';
import Trashometer from './trashometer/trashometer';
import Pie from './pie/pie';
import CO2Saved from './co2saved/co2saved';
import FlinkeBarn from './flinkebarn/flinkebarn';

import './mytrashstatus.css';

class MyTrashStatus extends Component {
    constructor(props) {
      super(props);
      this.state = {
        temp: 80
      };
    }
    render() {
        return (
            <div className="my-trash-status">
                <Trashometer temp={this.state.temp} />
                <input type="range" min="50" max="150" value={this.state.temp} onChange={e => this.setState({ temp: e.target.value })} />
                <div className="mini-stats">
                    <Pie residualWaste={60} plasticWaste={15} foodWaste={25}></Pie>
                    <CO2Saved saved={0.22} />
                    <FlinkeBarn />
                </div>
            </div>
        );
    }
}

export default MyTrashStatus;