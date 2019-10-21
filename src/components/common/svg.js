import React from 'react';

const getViewBox = name => {
  switch (name) {
    case 'profile':
      return '0 0 1000 1000';
    case 'show_more_dots':
      return '0 0 408 408';
    default:
      return '0 0 32 32';
  }
};

const getPath = (name, props) => {
  switch (name) {
    case 'profile':
      return (
        <path
          {...props}
          d='M500 10C229.4 10 10 229.4 10 500c0 270.6 219.4 490 490 490c270.6 0 490-219.4 490-490C990 229.4 770.6 10 500 10z M789.6 848.7c-46.5-1.7-144.9-17.2-187.9-113.6c-11.4-25.6-12.6-46.8 0-61c15-17 33.8-62.7 40.7-101.7c2.8-15.5 40.2-20.8 40.7-61c18.4-20.1-0.1-56.3 0-81.4c0.2-62.3 6.9-121.8-20.4-162.8c-80.7-121.3-242.1-120.2-325.5 0c-25.6 36.8-20.5 100.2-20.4 162.8c0 25.7-21.7 60.1 0 81.4c0 40.4 35.6 39 40.7 61c9.1 39.6 20.3 81.5 40.7 101.7c19.9 19.9 9 34.6 0 61c-29.3 86.1-132.5 112-180.3 119.5c-104.2-83-171.1-211-171.1-354.6c0-250.3 203-453.3 453.3-453.3c250.3 0 453.2 202.9 453.2 453.3C953.3 640.2 889.6 765.6 789.6 848.7z'
        />
      );
    case 'show_more_dots':
      return (
        <path
          {...props}
          d='M204 102c28.05 0 51-22.95 51-51S232.05 0 204 0s-51 22.95-51 51S175.95 102 204 102z M204 153c-28.05 0-51 22.95-51 51
          s22.95 51 51 51s51-22.95 51-51S232.05 153 204 153z M204 306c-28.05 0-51 22.95-51 51s22.95 51 51 51s51-22.95 51-51
          S232.05 306 204 306z'
        />
      );
    default:
      return <path />;
  }
};

const SVGIcon = ({
  name = '',
  style = {},
  fill = '#000',
  viewBox = '',
  width = '100%',
  className = '',
  height = '100%'
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox={viewBox || getViewBox(name)}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    {getPath(name, { fill })}
  </svg>
);

export default SVGIcon;
