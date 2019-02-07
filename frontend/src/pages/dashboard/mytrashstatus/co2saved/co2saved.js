import React, { Component } from 'react';
import './co2saved.css'
class CO2Saved extends Component {
    render() {
        let { saved } = this.props;
        return (
            <div className="co2-saved">
                <div>{saved} tonn</div>
                <div>co2 spart!</div>
            </div>
        );
    }
}

export default CO2Saved;