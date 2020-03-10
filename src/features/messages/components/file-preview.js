import React, { useEffect, useState } from 'react';

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
    if (contentType === 'image/jpeg') {
      setImgUrl(url);
    } else {
      setImgUrl(defaultFile);
    }
  }, []);

  return (
    <div>
      <a href={url} download="file_name" target="_blank">
        <img src={imgUrl} width="200px" height="200px" />
      </a>
    </div>
  );
}

export default FilePreview;
