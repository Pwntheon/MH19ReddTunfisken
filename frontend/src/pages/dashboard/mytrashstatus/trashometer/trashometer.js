import React, { Component } from 'react';

import Bargraph from '../../../../components/bargraph';

import './trashometer.css';
class Trashometer extends Component {
    render() {
        let {temp} = this.props;
        let primary, secondary, color;
        if(temp > 100) {
            primary = 50;
            secondary = (temp-100)/2;
            color="red";
        } else {
            primary = temp/2;
            secondary = (100-temp)/2;
            color="green";
        }
        return (
            <div className="trashometer">
                <Bargraph
                    primaryHeight={50}
                    primaryColor={"darkgray"} />
                <Bargraph
                    primaryHeight={primary}
                    primaryColor={"lightgreen"}
                    secondaryHeight={secondary}
                    secondaryColor={color} />
                <div className="baseline" />
            </div>
        );
    }
}

export default Trashometer;