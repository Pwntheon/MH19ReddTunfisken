import React, { Component } from 'react';
import './bargraph.css';

class Bargraph extends Component {
    render() {
        const {primaryHeight, primaryColor, secondaryHeight=null, secondaryColor} = this.props;
        return (
            <div className="bar-graph-container">
                <div className="bar-graph-inner">
                {secondaryHeight !== null && 
                    <div className="bar-graph-secondary" style={{height: secondaryHeight + "%", backgroundColor: secondaryColor}}></div>
                }
                    <div className="bar-graph-primary" style={{height: primaryHeight + "%", backgroundColor: primaryColor}}></div>
                </div>
            </div>
        );
    }
}

export default Bargraph;