import React from 'react';

const getViewBox = name => {
  switch (name) {
    case 'close':
      return '0 0 47.971 47.971';
    case 'profile':
      return '0 0 1000 1000';
    case 'show_more_dots':
      return '0 0 408 408';
    case 'star':
      return '0 0 487.222 487.222';
    default:
      return '0 0 32 32';
  }
};

const getPath = (name, props) => {
  switch (name) {
    case 'close':
      return (
        <path
          {...props}
          d='M28.228 23.986L47.092 5.122c1.172-1.171 1.172-3.071 0-4.242c-1.172-1.172-3.07-1.172-4.242 0L23.986 19.744L5.121 0.88
          c-1.172-1.172-3.07-1.172-4.242 0c-1.172 1.171-1.172 3.071 0 4.242l18.865 18.864L0.879 42.85c-1.172 1.171-1.172 3.071 0 4.242
          C1.465 47.677 2.233 47.97 3 47.97s1.535-0.293 2.121-0.879l18.865-18.864L42.85 47.091c0.586 0.586 1.354 0.879 2.121 0.879
          s1.535-0.293 2.121-0.879c1.172-1.171 1.172-3.071 0-4.242L28.228 23.986z'
        />
      );
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
    case 'star':
      return (
        <path
          {...props}
          d='M486.554 186.811c-1.6-4.9-5.8-8.4-10.9-9.2l-152-21.6l-68.4-137.5c-2.3-4.6-7-7.5-12.1-7.5l0 0c-5.1 0-9.8 2.9-12.1 7.6
		l-67.5 137.9l-152 22.6c-5.1 0.8-9.3 4.3-10.9 9.2s-0.2 10.3 3.5 13.8l110.3 106.9l-25.5 151.4c-0.9 5.1 1.2 10.2 5.4 13.2
		c2.3 1.7 5.1 2.6 7.9 2.6c2.2 0 4.3-0.5 6.3-1.6l135.7-71.9l136.1 71.1c2 1 4.1 1.5 6.2 1.5l0 0c7.4 0 13.5-6.1 13.5-13.5
		c0-1.1-0.1-2.1-0.4-3.1l-26.3-150.5l109.6-107.5C486.854 197.111 488.154 191.711 486.554 186.811z M349.554 293.911
		c-3.2 3.1-4.6 7.6-3.8 12l22.9 131.3l-118.2-61.7c-3.9-2.1-8.6-2-12.6 0l-117.8 62.4l22.1-131.5c0.7-4.4-0.7-8.8-3.9-11.9
		l-95.6-92.8l131.9-19.6c4.4-0.7 8.2-3.4 10.1-7.4l58.6-119.7l59.4 119.4c2 4 5.8 6.7 10.2 7.4l132 18.8L349.554 293.911z'
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