import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavBar } from '../components/index';
import '../../public/styles/historyStyles.css';
import { GetAllOrders, GetMenu, AcceptOrders, DeclineOrders, CompleteOrders } from '../actions/index';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.spinner = React.createRef();
        this.secondTable = React.createRef();
        this.secondTable2 = React.createRef();
        this.feedback = React.createRef();
        this.feedback2 = React.createRef();
        this.feedback3 = React.createRef();
    }

    onAdd() {
        console.log('Added')
    }

    onEdit() {
        console.log('Edited')
    }

    onDelete() {
        console.log('Deleted')
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
        this.props.act(GetMenu(token));
    }

    onGetOrders() {
        const role = window.localStorage.getItem('role');
        const token = window.localStorage.getItem('token');
        this.props.act(GetAllOrders(role, token));
    }

    render() {
        let sum = 0;
        if (this.props.status === 'LOADING' || this.props.statusMenu === 'LOADING' || this.props.statusAcceptOrders === 'LOADING') {
            this.spinner.current.style.display = 'block';
        } else if (this.props.status === 'NOTLOADING' || this.props.statusMenu === 'NOTLOADING' || this.props.statusAcceptOrders === 'NOTLOADING') {
            this.spinner.current.style.display = 'none';
        } else if (this.props.status === 'ERROR' || this.props.statusMenu === 'ERROR' || this.props.statusAcceptOrders === 'ERROR') {
            this.feedback.current.style.display = 'block';
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
                <div className="modal feedback" ref={this.feedback}><p>{this.props.error}</p> <button onClick={() => this.feedback.current.style.display = 'none'}>Ok</button></div>
                <div className="blur">
                    <NavBar
                        link0={'https://fast-food-fast.herokuapp.com/Admin'}
                        link1={'https://fast-food-fast.herokuapp.com/Admin'}
                        link2={'https://fast-food-fast.herokuapp.com/Admin'}
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
                                            {this.props.statusMenu === 'SUCCESS' &&
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
    declineorders: state.declineorders.acceptorders
});

const mapDispatchToProps = (dispatch) => ({
    act: (action) => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
