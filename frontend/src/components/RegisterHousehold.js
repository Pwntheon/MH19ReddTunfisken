import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class RegisterHousehold extends Component {
  districts = [
    { id: 0, name: 'Alna', enumName: 'Alna' },
    { id: 1, name: 'Bjerke', enumName: 'Bjerke' },
    { id: 2, name: 'Frogner', enumName: 'Frogner' },
    { id: 3, name: 'Gamle Oslo', enumName: 'GamleOslo' },
    { id: 4, name: 'Grorud', enumName: 'Grorud' },
    { id: 5, name: 'Grünerløkka', enumName: 'Grunerlokka' },
    { id: 6, name: 'Nordre Aker', enumName: 'NordreAker' },
    { id: 7, name: 'Norstrand', enumName: 'Norstrand' },
    { id: 8, name: 'Sagene', enumName: 'Sagene' },
    { id: 9, name: 'St. Hanshaugen', enumName: 'StHaugen' },
    { id: 10, name: 'Stovner', enumName: 'Stovner' },
    { id: 11, name: 'Søndre Norstrand', enumName: 'SondreNorstrand' },
    { id: 12, name: 'Ullern', enumName: 'Ullern' },
    { id: 13, name: 'Vestre Aker', enumName: 'VestreAker' },
    { id: 14, name: 'Østensjø', enumName: 'Ostensjo' }
  ];
  state = {
    numberOfAdults: 0,
    numberOfChildren: 0,
    district: {},
    address: ''
  };

  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.handleNumberOfAdultsChange = this.handleNumberOfAdultsChange.bind(
      this
    );
    this.handleNumberOfChildrenChange = this.handleNumberOfChildrenChange.bind(
      this
    );
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    // Should just take state and pass to props function

    const household = {
      ...this.state,
      district: this.state.district.enumName
    };

    this.props.createHousehold(household);
  }

  handleNumberOfAdultsChange(event) {
    this.setState({
      numberOfAdults: event.target.value
    });
  }

  handleNumberOfChildrenChange(event) {
    this.setState({
      numberOfChildren: event.target.value
    });
  }

  handleDistrictChange(event) {
    this.setState({
      district: event.target.value
    });
    console.log(event.target.value);
  }

  handleAddressChange(event) {
    this.setState({
      address: event.target.value
    });
  }

  render() {
    const { numberOfAdults, numberOfChildren, district, address } = this.state;

    return (
      <div className="register-household">
        <h1>Registrer husholdning</h1>
        <p>
          Lorem ipsum si amet. Resurkeligunf er fint. Gjenvinnging er bra. Noe
          med samtykke?
        </p>
        <Form>
          <Form.Group controlId="householdForm.DistrictSelect">
            <Form.Label>Velg bydel</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleDistrictChange}
              value={district.id}
            >
              {this.districts.map(d => {
                return (
                  <option key={d.id} id={d.id}>
                    {d.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="householdForm.NoOfAdults">
            <Form.Label>Antall voksne</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleNumberOfAdultsChange}
              value={numberOfAdults}
            >
              {new Array(10).fill(0).map((_, index) => {
                return (
                  <option key={index} id={index}>
                    {index}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="householdForm.NoOfChildren">
            <Form.Label>Antall barn</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleNumberOfChildrenChange}
              value={numberOfChildren}
            >
              {new Array(10).fill(0).map((_, index) => {
                return (
                  <option key={index} id={index}>
                    {index}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="householdForm.Address">
            <Form.Label>Addresse</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={this.handleAddressChange}
              value={address}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Send inn
          </Button>
        </Form>
      </div>
    );
  }
}

export default RegisterHousehold;
