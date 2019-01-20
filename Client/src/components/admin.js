import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavBar } from '../components/index';
import '../../public/styles/historyStyles.css';
import { GetAllOrders, GetMenu } from '../actions/index';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.spinner = React.createRef();
        this.secondTable = React.createRef();
        this.secondTable2 = React.createRef();
        this.feedback = React.createRef();
        this.feedback2 = React.createRef();
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

    componentDidMount() {
        this.props.act(GetAllOrders());
    }

    onGetMenu() {
        this.props.act(GetMenu());
    }

    onGetOrders() {
        this.props.act(GetAllOrders());
    }

    render() {
        let sum = 0;
        if (this.props.status === 'LOADING' || this.props.statusMenu === 'LOADING') {
            this.spinner.current.style.display = 'block';
        } else if (this.props.status === 'NOTLOADING' || this.props.statusMenu === 'NOTLOADING') {
            this.spinner.current.style.display = 'none';
        } else if (this.props.status === 'ERROR' || this.props.statusMenu === 'ERROR') {
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
                        <button onClick={() => this.onAdd()}>Add Food Item</button>
                        <button onClick={() => this.onGetMenu()}>Get Menu</button>
                        <button onClick={() => this.onGetOrders()}>Get Orders</button>
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
                                                            <button className={`acceptorder-btn${mealObject.id} accept-btn`}>Accept</button>
                                                            <button className={`declineorder-btn${mealObject.id} reject-btn`}>Decline</button>
                                                        </td>
                                                        <td className={`td6-meal${mealObject.id}`}>
                                                            <button className={`completeorder-btn${mealObject.id} accept-btn`}>Complete</button>
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
    act: PropTypes.func,
    GetAllOrders: PropTypes.func,
    GetMenu: PropTypes.func,
}

const mapStateToProps = state => ({
    status: state.getorders.status,
    error: state.getorders.error,
    orders: state.getorders.orders,
    statusMenu: state.getmenu.status,
    errorMenu: state.getmenu.error,
    menu: state.getmenu.mealData,
});

const mapDispatchToProps = (dispatch) => ({
    act: (action) => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
