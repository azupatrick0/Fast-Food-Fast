import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ text, visible, that }) => (
  <div>
    {
      visible && <div className="modal-orders feedback-orders">
        <div className="modal-orders__body animated bounceInDown">
          <p>{text}</p>
          <br/>
          <div className="modal-orders__button-flex">
            <button onClick={() => that.setState({
              visible: false
            })}>Cancel</button>
            <button onClick={() => {
              that.setState({
                payOnDelivery: true,
                loading: false,
                visible: false
              });
              that.orderAMeal();
            }}>Proceed</button>
          </div>
        </div>
      </div>
    }
  </div>
);

Modal.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  that: PropTypes.any
};

export default Modal;
