import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ text, visible, state }) => (
  <div>
    {
      visible && <div className="modal-orders feedback-orders">
        <div className="modal-orders__body animated bounceInDown">
          <p>{text}</p>
          <br/>
          <div className="modal-orders__button-flex">
            <button onClick={() => state.setState({
              visible: false
            })}>Cancel</button>
            <button onClick={() => {state.setState({
              payOnDelivery: true
            }); console.log('clicked', state.state);}}>Proceed</button>
          </div>
        </div>
      </div>
    }
  </div>
);

Modal.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  state: PropTypes.any
};

export default Modal;
