import React, { Component } from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryStack
} from 'victory';

import Theme from '../../../components/chartlayout';
import './performancecomparison.less';

class PerformanceComparison extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps() {
    }

    render() {
        const {white, blue, green} = this.props.performance;
        return (
            <div id="performance-comparison-chart">
                <VictoryChart
                    domainPadding={20}
                    theme={Theme}>
                    <VictoryAxis
                        tickValues={["me", "myborough"]}
                        tickFormat={["Vår husholdning", "Vår bydel"]} />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x}kg`)} />
                    <VictoryStack>
                        <VictoryBar
                            data={white}
                            x="whom"
                            y="weight" />
                        <VictoryBar
                            data={blue}
                            x="whom"
                            y="weight" />
                        <VictoryBar
                            data={green}
                            x="whom"
                            y="weight" />
                    </VictoryStack>
                </VictoryChart>

            </div>
        );
    }
}

export default PerformanceComparison;