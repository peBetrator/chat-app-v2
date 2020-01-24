import React, { Component, memo } from 'react';
import './index.css';

import defaultImageURI from '../../../assets/imgs/default_profile_image.png';

class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  handleImageLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    const { imageURI, width = '30px', height = '30px' } = this.props;

    return (
      <div>
        <img
          className={`circular__square`}
          src={loaded ? imageURI || defaultImageURI : defaultImageURI}
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
