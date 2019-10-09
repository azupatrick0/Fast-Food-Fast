import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavBar } from '../components/index';
import '../../public/styles/historyStyles.css';
import {
  GetAllOrders,
  getMenu,
  AcceptOrders,
  DeclineOrders,
  CompleteOrders,
  UpdateMenu,
  CloudinaryImageUpload,
  PopulateMenu,
  DeleteMenu,
} from '../actions/index';

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editStatus: false,
      addStatus: false,
      obj: null,
      foodPrice: '',
      foodImage: '',
      foodName: '',
    }
    this.spinner = React.createRef();
    this.secondTable = React.createRef();
    this.secondTable2 = React.createRef();
    this.feedback = React.createRef();
    this.feedback2 = React.createRef();
    this.feedback3 = React.createRef();
    this.feedback5 = React.createRef();
    this.feedback6 = React.createRef();
    this.foodImage = React.createRef();
    this.foodPrice = React.createRef();
    this.foodName = React.createRef();
  }

  onUpdateMenu(itemId) {
    const role = window.localStorage.getItem('role');
    const token = window.localStorage.getItem('token');
    const meal = this.foodName.current.value;
    const price = this.foodPrice.current.value;
    // Cloudinary Upload Image
    const formData = new FormData();
    formData.append('upload_preset', 'kls6oowk');
    formData.append('file', this.foodImage.current.files[0]);
    this.props.act(CloudinaryImageUpload(formData));
    this.setState({
      editStatus: false,
      obj: null,
    });

    // Call actions
    setTimeout(() => {
      this.props.act(UpdateMenu(itemId, role, token, meal, price, this.props.imgurl));
    }, 1800);

    setTimeout(() => {
      this.props.act(getMenu(token));
    }, 2800);
  }

  onPopulateMenu() {
    const role = window.localStorage.getItem('role');
    const token = window.localStorage.getItem('token');
    const meal = this.foodName.current.value;
    const price = this.foodPrice.current.value;
    // Cloudinary Upload Image
    const formData = new FormData();
    formData.append('upload_preset', 'kls6oowk');
    formData.append('file', this.foodImage.current.files[0]);
    this.props.act(CloudinaryImageUpload(formData));
    this.setState({
      addStatus: false,
    });
    // Call actions
    setTimeout(() => {
      this.props.act(PopulateMenu(role, token, meal, price, this.props.imgurl));
    }, 1800);

    setTimeout(() => {
      this.props.act(getMenu(token));
    }, 2800);
  }

  onAdd() {
    this.setState({
      addStatus: true,
    });
  }

  onEdit(val) {
    this.setState({
      editStatus: true,
      obj: Number(val),
    });
  }

  onDelete(itemId) {
    const role = window.localStorage.getItem('role');
    const token = window.localStorage.getItem('token');
    const deleteItem = prompt('Are you sure you want to delete this item?');
    if (deleteItem != null) {
      this.props.act(DeleteMenu(itemId, role, token));
      setTimeout(() => {
        this.props.act(getMenu(token));
      }, 2800);
    }
  }

  onAccept(id) {
    const role = window.localStorage.getItem('role');
    const token = window.localStorage.getItem('token');
    this.props.act(AcceptOrders(role, token, id));
    setTimeout(() => {
      this.props.act(GetAllOrders(role, token));
    }, 350);
    setTimeout(() => {
      this.feedback3.current.style.display = 'block';
      document.querySelector('.span').innerHTML = 'Accepted';
    }, 900);
  }

  onDecline(id) {
    const role = window.localStorage.getItem('role');
    const token = window.localStorage.getItem('token');
    this.props.act(DeclineOrders(role, token, id));
    setTimeout(() => {
      this.props.act(GetAllOrders(role, token));
    }, 350);
    setTimeout(() => {
      this.feedback3.current.style.display = 'block';
      document.querySelector('.span').innerHTML = 'Declined';
    }, 900);
  }

  onComplete(id) {
    const role = window.localStorage.getItem('role');
    const token = window.localStorage.getItem('token');
    this.props.act(CompleteOrders(role, token, id));
    setTimeout(() => {
      this.props.act(GetAllOrders(role, token));
    }, 350);
    setTimeout(() => {
      this.feedback3.current.style.display = 'block';
      document.querySelector('.span').innerHTML = 'Completed';
    }, 900);
  }

  componentDidMount() {
    const role = window.localStorage.getItem('role');
    const token = window.localStorage.getItem('token');
    this.props.act(GetAllOrders(role, token));
  }

  onGetMenu() {
    const token = window.localStorage.getItem('token');
    this.props.act(getMenu(token));
  }

  onGetOrders() {
    const role = window.localStorage.getItem('role');
    const token = window.localStorage.getItem('token');
    this.props.act(GetAllOrders(role, token));
  }

  render() {
    let sum = 0;
    const { isAuthenticated } = this.props;

    if (this.props.status === 'LOADING' || this.props.statusMenu === 'LOADING' || this.props.statusAcceptOrders === 'LOADING') {
      this.spinner.current.style.display = 'block';
    } else if (this.props.status === 'NOTLOADING' || this.props.statusMenu === 'NOTLOADING' || this.props.statusAcceptOrders === 'NOTLOADING') {
      this.spinner.current.style.display = 'none';
    } else if (this.props.status === 'ERROR' || this.props.statusMenu === 'ERROR' || this.props.statusAcceptOrders === 'ERROR' || this.props.addedToMenuStatus === 'ERROR' || this.props.deletedFromMenuStatus === 'ERROR') {
      this.feedback.current.style.display = 'block';
    }

    if (!isAuthenticated) {
      return <Redirect to='/signin' />
    }

    return (
      <Fragment>
        {this.props.status === 'FAILED' ? this.feedback.current.style.display = 'block' :
          this.props.statusMenu === 'FAILED' ? this.feedback2.current.style.display = 'block' : ''
        }

        <Helmet>
          <title>
            Fast-Food-Fast | Admin
                        </title>
          <link rel="shortcut icon" type="image/png" href='../../public/images/ffflogo.png' />
        </Helmet>
        <div className="modal feedback" ref={this.feedback3}><p><span className='span'></span></p> <button onClick={() => this.feedback3.current.style.display = 'none'}>Ok</button></div>
        <div className="modal feedback" ref={this.feedback2}><p>{this.props.errorMenu}</p> <button onClick={() => this.feedback2.current.style.display = 'none'}>Ok</button></div>
        <div className="modal feedback" ref={this.feedback}><p>{this.props.error || this.props.addedToMenuError || this.props.deletedFromMenuError}</p> <button onClick={() => this.feedback.current.style.display = 'none'}>Ok</button></div>
        <NavBar
          link0={'/Admin'}
          link1={'/Admin'}
          link2={'/Admin'}
          anchor1Body={'Orders'}
          anchor2Body={'Sign Out'}
          buttonBody={'ADMIN'}
          anchor3Body={'Orders'}
          anchor5Body={'Sign Out'}
        />
        <br />
        <br />
        <div className='quick-access'>
          <button className='add' onClick={() => this.onAdd()}>Add Food Item</button>
          <button className='get-menu' onClick={() => this.onGetMenu()}>Get Menu</button>
          <button className='get-orders' onClick={() => this.onGetOrders()}>Get Orders</button>
        </div>
        <div className="slide0-history">
          <br />
          <span className="history-centre"><strong>Orders</strong></span><br /><br />
          <div className="blur2">
            <div className="flex">
              <div className="flex-items"><br /><br /><br /><br /><br />
                <span className="spinner" ref={this.spinner}></span>


                <table className="second-table second-table-history" ref={this.secondTable}>
                  {this.props.status === 'SUCCESS' && <tbody>
                    <tr>
                      <th>S/N</th>
                      <th>Customer</th>
                      <th>Image</th>
                      <th>Meal</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Accept/Decline</th>
                      <th>Completed</th>
                    </tr>
                    {this.props.orders.map((mealObject) => {
                      return (
                        <tr className={`tr-meal${mealObject.id}`} key={`tr-meal${mealObject.id}`}>
                          <td>
                            {sum += 1}
                          </td>
                          <td className={`td1-meal${mealObject.id}`}>
                            {mealObject.name}
                          </td>
                          <td className={`td1-meal${mealObject.id}`}>
                            <img src={`${mealObject.imgurl}`} className={`img img${mealObject.id}`} />
                          </td>
                          <td className={`td2-meal${mealObject.id}`}>
                            {mealObject.meal}
                          </td>
                          <td className={`td3-meal${mealObject.id}`}>
                            {mealObject.quantity}
                          </td>
                          <td className={`td4-meal${mealObject.id}`}>
                            {mealObject.amount}
                          </td>
                          <td className={`td5-meal${mealObject.id}`}>
                            {mealObject.createdat}
                          </td>
                          <td className={`td5-meal${mealObject.id}`}>
                            {mealObject.status}
                          </td>
                          <td className={`td6-meal${mealObject.id}`}>

                            <button className={`acceptorder-btn${mealObject.id} accept-btn`} onClick={() => this.onAccept(`${mealObject.id}`)}>Accept</button>
                            <button className={`declineorder-btn${mealObject.id} reject-btn`} onClick={() => this.onDecline(`${mealObject.id}`)}>Decline</button>
                          </td>
                          <td className={`td6-meal${mealObject.id}`}>
                            <button className={`completeorder-btn${mealObject.id} accept-btn`} onClick={() => this.onComplete(`${mealObject.id}`)}>Complete</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  }
                </table>
                <br />
                <br />
                <div className="flex-items">
                  <p><strong>Menu</strong></p>
                  <table className="second-table second-table-admin" ref={this.secondTable2}>
                    {(this.props.statusMenu === 'SUCCESS') &&
                      <tbody>
                        {this.props.menu.map((mealObject) => {
                          return (
                            <tr className={`tr-meal${mealObject.id}`} key={`tr-meal${mealObject.id}`} >
                              <td className={`td1-meal${mealObject.id}`}>
                                <img src={`${mealObject.imgurl}`} className={`img img${mealObject.id}`} />
                              </td>
                              <td className={`td2-meal${mealObject.id}`}>
                                {mealObject.meal}
                              </td>
                              <td className={`td3-meal${mealObject.id}`}>
                                {mealObject.price}
                              </td>
                              <td className={`td4-meal${mealObject.id}`}>
                                <input type='number' className={`quantity${mealObject.id}`} placeholder='Quantity' value='1' readOnly hidden />
                              </td>
                              <td className={`td5-meal${mealObject.id}`}>
                                <button className={`edititem-btn${mealObject.id} edit-btn`} onClick={() => this.onEdit(`${mealObject.id}`)}>Edit</button>
                              </td>
                              <td className={`td5-meal${mealObject.id}`}>
                                <button className={`deleteitem-btn${mealObject.id} reject-btn`} onClick={() => this.onDelete(`${mealObject.id}`)}>Delete</button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    }

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {(this.state.editStatus == true) &&
            <div>
              {
                this.props.menu.map(mealObject => {
                  if (mealObject.id === this.state.obj) {
                    return (

                      <form key={mealObject.id}>
                        <div className='modal2  feedback5' ref={this.feedback5}>
                          <input type='file' ref={this.foodImage} name='foodImage' accept='image/*' className={`input1-edit-meal-value${mealObject.id} update-image`} defaultValue='' />
                          <br />
                          <br />
                          <input type='text' ref={this.foodName} name='foodName' className={`input2-edit-meal-value${mealObject.id}`} defaultValue={mealObject.meal} />
                          <br />
                          <br />
                          <input type='text' ref={this.foodPrice} name='foodPrice' className={`input3-edit-meal-value${mealObject.id}`} defaultValue={mealObject.price} />
                          <br />
                          <br />
                          <button type='button' className={`btn1-edit-meal-value${mealObject.id} accept-btn`} defaultValue='' onClick={() => { this.onUpdateMenu(mealObject.id) }}>Update Menu</button>
                          <br />
                          <br />
                          <button type='button' className={`btn2-edit-meal-value${mealObject.id}`} defaultValue='' onClick={() => this.feedback5.current.style.display = 'none'}>Cancel</button>
                        </div>
                      </form>
                    );
                  }
                })
              }
            </div>

          }
        </div>

        <div>
          {(this.state.addStatus == true) &&
            <div>
              {
                <form>
                  <div className='modal2 feedback6' ref={this.feedback6}>
                    <input type='file' ref={this.foodImage} name='foodImage' accept='image/*' className={`update-image`} defaultValue='' />
                    <br />
                    <br />
                    <input type='text' ref={this.foodName} name='foodName' defaultValue='' placeholder='Food Name' />
                    <br />
                    <br />
                    <input type='text' ref={this.foodPrice} name='foodPrice' defaultValue='' placeholder='Food Price' />
                    <br />
                    <br />
                    <button type='button' className={`accept-btn`} defaultValue='' onClick={() => { this.onPopulateMenu() }}>Add to Menu</button>
                    <br />
                    <br />
                    <button type='button' defaultValue='' onClick={() => this.feedback6.current.style.display = 'none'}>Cancel</button>
                  </div>
                </form>
              }
            </div>

          }
        </div>

      </Fragment>
    );
  }
}

Admin.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string,
  orders: PropTypes.array,
  statusMenu: PropTypes.string,
  errorMenu: PropTypes.string,
  menu: PropTypes.array,
  statusAcceptOrders: PropTypes.string,
  errorAcceptOrders: PropTypes.string,
  acceptorders: PropTypes.string,
  act: PropTypes.func,
  GetAllOrders: PropTypes.func,
  GetMenu: PropTypes.func,
  AcceptOrders: PropTypes.func,
  DeclineOrders: PropTypes.func,
  CompleteOrders: PropTypes.func,
  message: PropTypes.string,
  imgurl: PropTypes.string,
  updatedMenuStatus: PropTypes.string,
  addedToMenuError: PropTypes.string,
  addedToMenuStatus: PropTypes.string,
  deletedFromMenuStatus: PropTypes.string,
  deletedFromMenuError: PropTypes.string,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  status: state.getorders.status,
  error: state.getorders.error,
  orders: state.getorders.orders,
  statusMenu: state.getmenu.status,
  errorMenu: state.getmenu.error,
  menu: state.getmenu.mealData,
  statusAcceptOrders: state.acceptorders.status,
  errorAcceptOrders: state.acceptorders.error,
  acceptorders: state.acceptorders.acceptorders,
  statusDeclineOrders: state.declineorders.status,
  errorDeclineOrders: state.declineorders.error,
  declineorders: state.declineorders.acceptorders,
  imgurl: state.cloudinary.imgurl,
  updatedMenuStatus: state.updatedmenu.status,
  addedToMenuStatus: state.addedtomenu.status,
  addedToMenuError: state.addedtomenu.error,
  deletedFromMenuStatus: state.deletedfrommenu.status,
  deletedFromMenuError: state.deletedfrommenu.error,
});

const mapDispatchToProps = (dispatch) => ({
  act: (action) => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
