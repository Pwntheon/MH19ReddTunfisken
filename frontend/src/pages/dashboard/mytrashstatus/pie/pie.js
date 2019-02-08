import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';
class Pie extends Component {
    render() {
        let {foodWaste, plasticWaste, residualWaste} = this.props;
        return (
            <div>
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
            </div>
        );
    }
}

export default Pie;