import React, { Component } from 'react';
import './infobox.css'

class Infobox extends Component {
    render() {
        const {text, buttonText, headerText, color} = this.props;
        return (
            <div className="infobox-container">
                <h3 style={{color: color}}>{headerText}</h3>
                <span>{text}</span>
                <button style={{backgroundColor: color}}>{buttonText}</button>
            </div>
        );
    }
}

export default Infobox;