import React, { Component } from 'react';
import { Webcam } from '../webcam/webcam';
import Api from '../api/cameraApi';
import Alert from 'react-bootstrap/Alert';
import './Camera.css';
class Camera extends Component {
  constructor() {
    super();
    this.webcam = null;
    this.state = {
      capturedImage: null,
      captured: false,
      uploading: false
    };
  }

  componentDidMount() {
    // initialize the camera
    this.canvasElement = document.createElement('canvas');
    this.webcam = new Webcam(
      document.getElementById('webcam'),
      this.canvasElement
    );
    this.webcam.setup().catch(() => {
      alert('Error getting access to your camera');
    });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.offline && prevProps.offline === true) {
      // if its online
      this.batchUploads();
    }
  }

  captureImage = async () => {
    const capturedData = await this.webcam.takeBlobPhoto({
      type: 'jpeg',
      quality: 0.8
    });

    console.log(capturedData);
    this.setState({
      captured: true,
      capturedImage: capturedData.blob
    });
  };

  discardImage = () => {
    this.setState({
      captured: false,
      capturedImage: null
    });
    console.log(this.props);
    this.props.onRemoveImage();
  };

  uploadImage = async () => {
    console.log(this.state);
    const { capturedImage } = this.state;
    if (!capturedImage) return;
    console.log(capturedImage);

    this.setState({
      uploading: true
    });
    const response = await Api.postImage(capturedImage);
    if (response.status !== 200) {
      console.error('Something went wrong');
      return;
    }

    const data = await response.json();
    this.setState({
      uploading: false
    });

    this.props.onPredictResult(data);
    console.log(data);
  };

  render() {
    let imageDisplay = '';
    const fullWidth = window.innerWidth / 2;
    if (this.state.capturedImage) {
      const imageUrl = URL.createObjectURL(this.state.capturedImage);
      imageDisplay = <img src={imageUrl} alt="captured" width="350" />;
    } else {
      imageDisplay = <span />;
    }

    const buttons = this.state.captured ? (
      <div>
        <button className="deleteButton" onClick={this.discardImage}>
          {' '}
          Slett bilde{' '}
        </button>
        <button className="captureButton" onClick={this.uploadImage}>
          {' '}
          Last opp bilde{' '}
        </button>
      </div>
    ) : (
      <button className="captureButton" onClick={this.captureImage}>
        {' '}
        Ta bilde{' '}
      </button>
    );

    const uploading = this.state.uploading ? (
      <div>
        <p> Laster opp bilde. Vennligst vent </p>
      </div>
    ) : (
      <span />
    );

    const video = this.state.captured ? (
      <video
        className="hidden"
        autoPlay={false}
        playsInline={false}
        muted
        id="webcam"
        width="100%"
        height={fullWidth}
      />
    ) : (
      <video
        autoPlay
        playsInline
        muted
        id="webcam"
        width="100%"
        height={fullWidth}
      />
    );

    return (
      <div>
        <Alert variant="warning">
          <Alert.Heading>Hei! </Alert.Heading>
          <p>Bildene du tar blir lastet opp til våre servere.</p>
        </Alert>
        ;{uploading}
        {video}
        <div className="imageCanvas">{imageDisplay}</div>
        {buttons}
      </div>
    );
  }
}

export default Camera;
