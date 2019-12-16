import React from 'react';
import PropTypes from 'prop-types';
import '../../public/styles/simpleLoaderStyles.css';

const SimpleLoader = ({ fontSize, color }) => (
  <span className="fa-3x spinner__font-0">
    <i className='fas fa-spinner fa-pulse' style={{ fontSize: fontSize, color: color }}></i>
  </span>
);

SimpleLoader.propTypes = {
  fontSize: PropTypes.number,
  color: PropTypes.string
}

export default SimpleLoader;
