import React, { useEffect, useState } from 'react';
import './message.css';

import defaultFile from '../../../assets/imgs/no-img.jpg';

function FilePreview(props) {
  const [imgUrl, setImgUrl] = useState('');
  const {
    file: {
      url,
      metadata: { contentType },
    },
  } = props;

  useEffect(() => {
    const imgTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (contentType && imgTypes.includes(contentType)) {
      setImgUrl(url);
    } else {
      setImgUrl(defaultFile);
    }
  }, []);

  return (
    <div>
      <a href={url} download="file_name" target="_blank">
        <img className="image__preview" src={imgUrl} />
      </a>
    </div>
  );
}

export default FilePreview;
