import React, { Component } from 'react';
import './Predictions.css';
const tagDescriptions = {
  papp:
    'Papp skal i papirsøppelet. Husk å brette pappen godt sammen slik det blir bedre plass i containeren.',
  plast:
    'Plast skal i blå pose. Husk å skylle emballasjen med kaldt vann før du kaster den.',
  metall: 'Metall skal i glass/metallsøppelet',
  restavfall: 'Restavfall skal i restavfallet',
  pant: 'Pant alt, alltid',
  tekstiler: 'Tekstiler skal leveres til klesbutikker/miljøstasjon',
  matavfall: 'Matavfall skal i grønne poser',
  glass: 'Glass skal i glass/metallsøppelet',
  venn: 'Venner skal man være snill med'
};

const Prediction = props => {
  const probability = Math.round(props.prediction.probability * 100);

  if (probability < 30) return '';

  const desc = tagDescriptions[props.prediction.tagName];
  return (
    <li key={props.prediction.tagId}>
      Dette er {props.prediction.tagName}. {desc}. Vi er{' '}
      {Math.round(props.prediction.probability * 100)}% på denne antagelsen.
    </li>
  );
};

class Predictions extends Component {
  render() {
    const { predictions } = this.props;
    console.log(predictions);
    const listItems = predictions.map(prediction => (
      <Prediction key={prediction.tagId} prediction={prediction} />
    ));
    return <ul className="predictions">{listItems}</ul>;
  }
}

export default Predictions;
