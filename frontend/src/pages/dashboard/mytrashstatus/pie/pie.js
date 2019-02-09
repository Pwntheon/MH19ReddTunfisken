import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';
import './pie.css';
class Pie extends Component {
    render() {
        let {foodWaste, plasticWaste, residualWaste} = this.props;
        return (
            <div className="hva-kaster-du">
                <PieChart
                    slices={[
                        {
                            color: 'lightgray',
                            value: residualWaste,
                        },
                        {
                            color: 'blue',
                            value: plasticWaste,
                        },
                        {
                            color: 'green',
                            value: foodWaste,
                        }
                    ]}
                />
                <span>Hva kaster du?</span>
            </div>
        );
    }
}

export default Pie;