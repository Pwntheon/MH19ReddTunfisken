import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';

import Button from 'react-bootstrap/Button';
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

  onClickRenderCamera = () => {
    this.setState({
      renderCamera: true
    });
  };

  render() {
    const { predictions, renderCamera } = this.state;
    let predictionView = '';
    if (predictions && predictions.length) {
      predictionView = <Predictions predictions={predictions} />;
    }

    if (renderCamera) {
      return (
        <div>
          <Camera
            onPredictResult={this.onPredictionsRecieved}
            onRemoveImage={this.onRemoveImage}
          />
          {predictionView}
        </div>
      );
    }
    return (
      <div>
        <Jumbotron>
          <h1>Hva skal hvor?</h1>
          <p>
            Det er ikke alltid lett å vite hvordan man skal gjenvinne ting. Her
            kan du få hjelp til dette.
          </p>
        </Jumbotron>
        <h2>Ofte stilte spørsmål</h2>

        <Tab.Container
          id="frequently-asked-questions"
          defaultActiveKey="#link1"
        >
          <Row>
            <Col sm={12}>
              <ListGroup>
                <ListGroup.Item variant="light" action href="#link1">
                  Hvor godt må jeg skylle plasten før jeg kaster den?
                </ListGroup.Item>
                <ListGroup.Item variant="light" action href="#link2">
                  Må jeg ta av korken på melkekartongen før jeg sorterer?{' '}
                </ListGroup.Item>
                <ListGroup.Item variant="light" action href="#link3">
                  Hvor kaster jeg isopor?
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  Plastemballasjen skal være helt tom når den kildesorteres.
                  Mesteparten av plastemballasjen man har hjemme er ren når den
                  er tømt. Det skal ikke så mye til for å få litt skitten plast
                  ren nok – skyll med kaldt vann og eventuelt ta et lite tak med
                  oppvaskbørsten. Når flasker med for eksempel shampo, balsam og
                  såpe er tomme, fyll dem med vann, rist godt, bruk opp restene
                  og tøm ut vannrestene. Da er det som regel rent nok.
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  Nei, det er ikke nødvendig. Skyll og brett kartongen. I de
                  fleste kommuner sorteres kartongen sammen med papp og papir.
                  Korker og lokk kan henge på, da disse sorteres bort i
                  gjenvinningsprosessen. Om du skriver navn og telefonnummer på
                  kartongen har du ett lodd i returkartonglotteriet. Med
                  enkeltkartonger kan du vinne 10.000 og kubber med minst 7
                  kartonger kan vinne inntil 100.000 kr.
                </Tab.Pane>
                <Tab.Pane eventKey="#link3">
                  Isopor er laget av plast, men kan ikke gjenvinnes sammen med
                  annen plastemballasje. Derfor skal små mengder isopor kastes i
                  restavfallet. Dersom du har større mengder isopor skal det
                  leveres på en gjenvinningsstasjon. Dersom isoporen ikke
                  blandes med annen plast, kan den nemlig materialgjenvinnes.
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <p>
                <i>Data fra sortere.no</i>
              </p>
            </Col>
            <Col sm={12}>
              <Button variant="outline-secondary">Vis flere spørsmål</Button>
            </Col>
          </Row>
        </Tab.Container>
        <Button
          variant="primary"
          size="lg"
          block
          onClick={this.onClickRenderCamera}
        >
          Ta bilde av produktet du skal kaste!
        </Button>
      </div>
    );
  }
}

export default WhatWhere;
