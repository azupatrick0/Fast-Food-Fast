import React, { Fragment, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavBar } from '../components/index';
import '../../public/styles/historyStyles.css';
import { GetHistory } from '../actions/index';
import Loader from './Loader';

export const History = ({ status, error, history, isAuthenticated, GetHistory }) => {
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const id = window.localStorage.getItem('id');
    GetHistory(token, id);
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/signin' />
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          Fast-Food-Fast | History
            </title>
        <link rel="shortcut icon" type="image/png" href='../../public/images/ffflogo.png' />
      </Helmet>

      <NavBar
        link0={'/Orders'}
        link1={'/Orders'}
        link2={'/History'}
        anchor1Body={'Order a meal'}
        anchor2Body={'Sign Out'}
        buttonBody={isAuthenticated ? `Hello ${localStorage.getItem('name')}` : 'HISTORY'}
        anchor3Body={'Order a meal'}
        anchor4Body={'History'}
        anchor5Body={'Sign Out'}
      />

      <div className="slide0-orders">
        <div className="blur-history-page">
          <br />
          <br />
          <span className="history-centre"><strong>History of Orders</strong></span>
          <div className="flex">
            <div className="flex-items">
              <br />
              <span>{status === 'LOADING' && <Loader />}</span>
              <span>{status === 'FAILED' && <Loader text={error} link={'/orders'} />}</span>
              <span>{status === 'ERROR' && <Loader text={error} />}</span>
              <table className="second-table second-table-history">
                <tbody>
                  {history && history !== null ? history.map(mealObject => (
                    <tr key={`tr-meal${mealObject.id}`}>
                      <td>
                        <img src={`${mealObject.imgurl}`} className='img' />
                      </td>
                      <td>
                        {mealObject.meal}
                      </td>
                      <td>
                        {mealObject.quantity}
                      </td>
                      <td>
                        {mealObject.amount}
                      </td>
                      <td>
                        {mealObject.createdat}
                      </td>
                      <td>
                        {mealObject.status}
                      </td>
                    </tr>
                  )
                  ) : <tr>
                      <td>No History of ordered meals yet</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

History.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string,
  history: PropTypes.array,
  GetHistory: PropTypes.func,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = ({ orderhistory }) => ({
  status: orderhistory.status,
  error: orderhistory.error,
  history: orderhistory.history,
});

export default connect(mapStateToProps, { GetHistory })(History);
