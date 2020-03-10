import React from 'react';

const FileUploader = ({ children, onChange }) => {
  let hiddenInputStyle = {};
  if (children) {
    hiddenInputStyle = {
      position: 'absolute',
      top: '-9999px',
    };
  }

  return (
    <label>
      <input
        type="file"
        style={hiddenInputStyle}
        // accept="image/*"
        // multiple
        onChange={onChange}
      />
      {children}
    </label>
  );
};

export default FileUploader;
