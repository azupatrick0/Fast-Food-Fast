import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Loader = ({ text, link }) => (
  <div style={{ backgroundColor: 'white', width: '100%', height: '100vh', paddingTop: '22vw', paddingLeft: '0', fontWeight: 'bold', fontFamily: 'Arial', display: 'flex' }}>
    <div style={{ width: '10%' }}></div>
    {text ? <span>
      {text} <Link to={link}>order</Link>
    </span> : <Fragment><div style={{ width: '35%' }}></div><div className="fa-3x"><i className='fas fa-spinner fa-pulse' style={{ fontSize: 48, color: 'red' }}></i></div></Fragment>}
  </div>
);

Loader.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string
}

export default Loader;
