import React, { Component } from 'react';
import './graphlines.css';

const graphlines = ['10 kg', '7,5 kg', '5 kg', '2,5 kg', '0,0 kg'];
class Graphlines extends Component {
  render() {
    return (
      <div className="graphline-container">
        {graphlines.map((g, index) => (
          <div key={index} className="graphline">
            {g}
          </div>
        ))}
      </div>
    );
  }
}

export default Graphlines;
