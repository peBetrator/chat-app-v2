import React, { Component } from 'react';
import './index.css';

class ProfileImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      hasError: false,
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleImageErrored = this.handleImageErrored.bind(this);
  }

  handleImageLoaded() {
    this.setState({ loaded: true, hasError: false });
  }

  handleImageErrored() {
    this.setState({ loaded: false, hasError: true });
  }

  render() {
    const { loaded, hasError } = this.state;
    const { imageURI, width = '30px', height = '30px' } = this.props;

    return (
      <div>
        <img
          className={`circular__square ${!loaded && 'display-none'}`}
          src={imageURI}
          onLoad={this.handleImageLoaded}
          onError={this.handleImageErrored}
          width={width}
          height={height}
        />
        {!loaded && <p>Loading...</p>}
        {hasError && <p>Couldn't load img</p>}
      </div>
    );
  }
}

export default ProfileImage;
