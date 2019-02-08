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

  onRemoveImage = data => {
    this.setState({
      predictions: []
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
        <Camera
          onPredictResult={this.onPredictionsRecieved}
          onRemoveImage={this.onRemoveImage}
        />
        {predictionView}
      </div>
    );
  }
}

export default WhatWhere;
