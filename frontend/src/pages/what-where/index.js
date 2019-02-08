import React, { Component } from 'react';
import Camera from '../../components/Camera';
import Predictions from '../../components/Predictions';

class WhatWhere extends Component {
  state = {
    predictions: []
  };

  onPredictionsRecieved = data => {
    this.setState({
      predictions: data.predictions
    });
  };

  render() {
    const { predictions } = this.state;
    let predictionView = '';
    if (predictions && predictions.length) {
      predictionView = <Predictions predictions={predictions} />;
    }
    return (
      <div>
        What WhatWhere
        <Camera onPredictResult={this.onPredictionsRecieved} />
        {predictionView}
      </div>
    );
  }
}

export default WhatWhere;
