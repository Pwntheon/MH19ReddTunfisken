import React, { Component } from 'react';
import './Predictions.css';
const tagDescriptions = {
  papp:
    'Papp skal i papirsøppelet. Husk å brette pappen godt sammen slik det blir bedre plass i containeren.',
  plast:
    'Plastemballasje skal i blå pose. Husk å skylle emballasjen med kaldt vann før du kaster den. Hardplast og plast du ikke får ren uten å bruke varmt vann kan kastes i restavfall',
  metall: 'Metall skal leveres til nærmeste returnpunkt sammen med glass',
  restavfall: 'Restavfall puttes i vanlig pose og kastes i søppeldunken din. Restavfallet havner på forbrenningsanlegget og blir gjort om til fjernvarme',
  pant: 'Pant alt, alltid',
  tekstiler: 'Tekstiler og sko kan leveres til UFF- og Fretex-containere i Oslo, eller ved en gjenbruksstasjon. Uavhengig av om skoene er laget av plast eller ikke. Ødelagte tekstiler gjenvinnes til nye tekstiler.',
  matavfall: 'Mat skal i grønne poser. Du kan også kaste tørkepapir i matavfallet så lenge det ikke er fullt av såpe. Matavfallet blir gjenvunnet til biogass og biogjødsel. Ruters biogass-bussser kan kjøre 250 meter på innholdet i en grønn pose',
  glass: 'Glass skal i glass/metallsøppelet',
  keramikk: 'Keramikk skal i restavfallet. Kopper, ildfaste former, porselen og speil skal ikke sorteres sammen med glass og metall',
  politiker: 'Selv om politikere kan være upopulære skal de ikke leveres til gjenvinning',
  venn: 'Ikke kast vennene dine. Ta vare på de :)',
  elektronikk:
    'Elektronikk skal leveres til nærmeste elektronikk forhandler. Om det fortsatt er brukelig kan du kanskje gi det til en venn eller prøve å selge det?'
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
