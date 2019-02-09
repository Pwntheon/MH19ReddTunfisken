import React, { Component } from 'react';
import './co2saved.css'
class CO2Saved extends Component {
    render() {
        let { saved, text, forklaring } = this.props;
        return (
            <div className="co2-saved">
                <div><i className="fas fa-bus"></i></div>
                <div className="co2-saved-distance">{saved}</div>
                <div className="co2-saved-description">{text}</div>
            </div>
        );
    }
}

export default CO2Saved;