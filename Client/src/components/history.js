import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavBar } from '../components/index';
import '../../public/styles/orderStyles.css';
import { GetHistory} from '../actions/index';

export class History extends Component {
    constructor(props) {
        super(props);
        this.spinner = React.createRef();
        this.secondTable = React.createRef();
        this.feedback = React.createRef();
    }

    onDeleteOrder() {
        console.log('Deleted')
    }

    componentDidMount() {
        this.props.act(GetHistory());
        console.log('called')
    }

    render() {

        if (this.props.status === 'LOADING') {
            this.spinner.current.style.display = 'block';
        } else if (this.props.status === 'NOTLOADING') {
            this.spinner.current.style.display = 'none';
        } else if (this.props.status === 'ERROR') {
            this.feedback.current.style.display = 'block';
        }
        return (
            <Fragment>
                {this.props.status === 'FAILED' ? this.feedback.current.style.display = 'block' : ''}
                
                <Helmet>
                    <title>
                        Fast-Food-Fast | History
                        </title>
                    <link rel="shortcut icon" type="image/png" href='../../public/images/ffflogo.png' />
                </Helmet>

                <div className="modal feedback" ref={this.feedback}><p>{this.props.error}</p> <button onClick={() => this.feedback.current.style.display = 'none'}>Ok</button></div>

                <div className="blur">
                    <NavBar View={'historyPage'} />

                    <div className="slide0">
                        <br />
                        <span className="centre"><strong>Order History</strong></span><br /><br />
                        <div className="blur2">
                            <div className="flex">
                                <div className="flex-items"><br /><br /><br /><br /><br />
                                <span className="spinner" ref={this.spinner}></span>
                                    <table className="second-table" ref={this.secondTable}>
                                    {this.props.status === 'SUCCESS' && <tbody>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Image</th>
                                            <th>Meal</th>
                                            <th>Quantity</th>
                                            <th>Amount</th>
                                        </tr>
                                            {this.props.data.map((mealObject) => {
                                                return (
                                                    <tr className={`tr-meal${mealObject.id}`} key={`tr-meal${mealObject.id}`}>
                                                        <td>
                                                            {mealObject.id}
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
            </Fragment>
        );
    }
}

History.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    data: PropTypes.array,
    act: PropTypes.func,
    GetHistory: PropTypes.func,
}

const mapStateToProps = state => ({
    status: state.orderhistory.status,
    error: state.orderhistory.error,
    data: state.orderhistory.history,
});

const mapDispatchToProps = (dispatch) => ({
    act: (action) => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
