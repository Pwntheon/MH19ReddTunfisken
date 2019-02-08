import React, { Component } from 'react';

const Prediction = props => (
  <li key={props.prediction.tagId}>
    Dette er en {props.prediction.tagName}. Vi er{' '}
    {Math.round(props.prediction.probability * 100)}% sikre på dette.
  </li>
);

class Predictions extends Component {
  render() {
    const { predictions } = this.props;
    console.log(predictions);
    const listItems = predictions.map(prediction => (
      <Prediction key={prediction.tagId} prediction={prediction} />
    ));
    return <ul>{listItems}</ul>;
  }
}

export default Predictions;
