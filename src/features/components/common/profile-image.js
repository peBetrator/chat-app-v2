import React, { Component, memo } from 'react';
import './index.css';

import defaultImageURI from '../../../assets/imgs/default_profile_image.png';

class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
    };
  }

  handleImageLoaded = () => {
    this.setState({ loaded: true });
  };

  handleImageError = () => {
    this.setState({ error: true, loaded: false });
  };

  render() {
    const { loaded, error } = this.state;
    const { imageURI, width = '30px', height = '30px' } = this.props;

    return (
      <div>
        <img
          className={`circular__square`}
          src={(loaded && !error) ? imageURI || defaultImageURI : defaultImageURI}
          onError={this.handleImageError}
          onLoad={this.handleImageLoaded}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

const MemoProfileImage = memo(ProfileImage, (prevProps, nextProps) => {
  if (prevProps.imageURI === nextProps.imageURI) {
    return true;
  }

  return false;
});

export default MemoProfileImage;
