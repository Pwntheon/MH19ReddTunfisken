import React, { Component } from 'react';

import Bargraph from '../../../../components/bargraph';
import Graphlines from './graphlines/graphlines';

import Infobox from './infobox/infobox';

import './trashometer.css';

const doingGood = {
  text: `Du produserer bare halvparten av gjennomsnittelig avfall for din målgruppe!`,
  buttonText: 'Utsett henting',
  headerText: 'Bra!',
  color: '#256264'
};

const doingBad = {
  text: `Du produserer mer enn gjennomsnittlig avfall for din målgruppe`,
  buttonText: 'Tips og råd',
  headerText: 'Oisann!',
  color: '#f25929'
};

class Trashometer extends Component {
  render() {
    let legend = [
      { color: '#bbc6c8', text: 'Gjennomsnittlig for din målgruppe' },
      { color: '#8dc63f', text: 'Opptjente poeng denne måneden' },
      { color: '#66952e', text: 'Ditt forbruk denne måneden' },
      { color: '#f25929', text: 'Ditt overforbruk' }
    ];
    let infoboxDetails;
    let { temp } = this.props;
    console.log(temp);
    let primary, secondary, color;
    if (temp > 100) {
      primary = 50;
      secondary = (temp - 100) / 2;
      color = '#f25929';
      infoboxDetails = doingBad;
      legend = [legend[0], legend[1], legend[3]];
    } else {
      primary = temp / 2;
      secondary = (100 - temp) / 2;
      color = '#8dc63f';
      infoboxDetails = doingGood;
      legend = [legend[0], legend[1], legend[2]];
    }
    return (
      <div className="trashometer-container">
        <div className="trashometer-header-container">
          <h1>Ditt trashometer</h1>
          <div className="trashometer-legend">
            {legend.map((i, index) => (
              <div key={index}>
                <div
                  style={{ backgroundColor: i.color }}
                  className="legend-color"
                />
                <div className="legend-description">{i.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="trashometer">
          <Bargraph primaryHeight={50} primaryColor={'#bbc6c8'} />
          <Bargraph
            primaryHeight={primary}
            primaryColor={'#66952e'}
            secondaryHeight={secondary}
            secondaryColor={color}
          />
          <div className="bar-graph-container">
            <div className="bar-graph-inner" />
          </div>
          <Graphlines />

          <Infobox {...infoboxDetails} />
        </div>
      </div>
    );
  }
}

export default Trashometer;
