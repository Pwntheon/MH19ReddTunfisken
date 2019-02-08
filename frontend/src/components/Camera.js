import React, { Component } from 'react';
import { Webcam } from '../webcam/webcam';
import Api from '../api/cameraApi';
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
    const fullWidth = window.innerWidth;
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

    return (
      <div>
        {uploading}
        <video
          autoPlay
          playsInline
          muted
          id="webcam"
          width="100%"
          height={fullWidth}
        />
        <br />
        <div className="imageCanvas">{imageDisplay}</div>
        {buttons}
      </div>
    );
  }
}

export default Camera;
