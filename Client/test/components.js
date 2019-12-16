import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Routes from '../src/routes/index';
import { Footer, NotFound, Signup, Signin } from '../src/components';
// eslint-disable-next-line import/no-named-as-default
import History from '../src/components/history';
import { Orders } from '../src/components/orders';
import { NavBar } from '../src/components/NavBar';
import Modal from '../src/components/Modal';
import LandingPage from '../src/components/landingPage';

require('browser-env')();

configure({ adapter: new Adapter() });

const modalProps = {
  text: 'A modal',
  visible: true,
  that: this
}

const ordersProps = {
  status: 'SUCCESS',
  error: 'An error occured',
  statusOrder: 'SUCCESS',
  errorOrder: 'An error occured',
  orderResponse: 'order response',
  getMenu: () => {},
  mealData: [{
    id: 1,
    price: 200
  },
  {
    id: 2,
    price: 400
  }],
  makeOrder: () => {},
  isAuthenticated: true,
  history: {
    push: ''
  }
}

const historyProps = {
  status: 'SUICCESS',
  error: '',
  history: [{meal: 'burger'}],
  isAuthenticated: true,
  GetHistory: () => {}
}

describe('Fast-Food-Fast Client Components Test Suite', () => {
  // FROM: https://www.npmjs.com/package/node-localstorage
  beforeEach(()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ'

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        // eslint-disable-next-line no-global-assign
        localStorage = new LocalStorage('./scratch');
      }
       
      localStorage.setItem('token', token);
})
  describe('Routes Test Suite', () => {
    delete window.location;
    window.location = {};
    describe('<Routes />', () => {
      it('renders all Routes', () => {
        const wrapper = shallow(<Routes />);
        expect(wrapper.length).to.eql(1);
      });
    });
  });

  describe('Components Test Suite', () => {
    describe('<Footer />', () => {
      it('renders Footer Component', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.length).to.eql(1);
      });
    });

    describe('<NavBar />', () => {
      delete window.location;
      window.location = {};
      it('renders NavBar Component', () => {
        const wrapper = shallow(
          <NavBar
              link0={'/Orders'}
              link1={'/History'}
              link2={'/Orders'}
              anchor1Body={'History'}
              anchor2Body={'Sign Out'} 
              buttonBody={'ORDER'}
              anchor3Body={'History'}
              anchor4Body={'Order a meal'}
              anchor5Body={'Sign Out'}
          />);
        expect(wrapper.length).to.eql(1);
      });

      it('log out a user', async () => {
        const wrapper = shallow(
          <NavBar
              link0={'/Orders'}
              link1={'/History'}
              link2={'/Orders'}
              anchor1Body={'History'}
              anchor2Body={'Sign Out'} 
              buttonBody={'ORDER'}
              anchor3Body={'History'}
              anchor4Body={'Order a meal'}
              anchor5Body={'Sign Out'}
          />);
        await wrapper.instance().onLogout();
        expect(localStorage.getItem('token')).to.eql(null);
      })
    });

    describe('<NotFound />', () => {
      it('renders NotFound Component', () => {
        const wrapper = shallow(<NotFound />);
        expect(wrapper.html().length).to.eql(422);
      });
    });

    describe('<LandingPage />', () => {
      it('renders LandingPage Component', () => {
        delete window.location;
        window.location = {};
        const wrapper = shallow(<LandingPage />)
        expect(wrapper.length).to.eql(1);
       
      });
    });

    describe('<Signup />', () => {
      it('renders connected Signup Component', () => {
        const wrapper = shallow(<Signup act={()=> 'clicked me'}/>);
       const event = {target: {name: "name", value: "francis"}};
        const event2 = {target: {name: "email", value: "francis@gmail.com"}};
        const event3 = {target: {name: "password", value: "francis42"}};
        const event4 = {keyCode: 13};
        expect(wrapper.length).to.eql(1);              
        wrapper.find('.signupName').simulate('change',event);
        wrapper.find('.signupEmail').simulate('change',event2);
        wrapper.find('.signupPassword').simulate('change',event3);
        const userEmail = <input className="signupEmail" value="myemail"/>
        const userPassword = <input className="signupPassword" value="mypassword"/>
        wrapper.find('.form').simulate('keyup',userEmail,userPassword,event4);});
    });

    describe('<Signin />', () => {
      it('renders connected Signin Component', () => {
        const wrapper = shallow(<Signin act={()=> 'clicked me'}/>);
        const event2 = {target: {name: "email", value: "francis@gmail.com"}};
        const event3 = {target: {name: "password", value: "francis42"}};
        const event4 = {keyCode: 13};
        expect(wrapper.length).to.eql(1);              
        wrapper.find('.signupEmail').simulate('change',event2);
        wrapper.find('.signupPassword').simulate('change',event3);
        const userEmail = <input className="signupEmail" value="myemail"/>
        const userPassword = <input className="signupPassword" value="mypassword"/>
        wrapper.find('.form').simulate('keyup',userEmail,userPassword,event4);
      });
    });

    describe('<History />', () => {
      it('renders connected History Component', () => {
        const wrapper = shallow(<History {...historyProps}/>);
        expect(wrapper.length).to.eql(1);   
      });
    });

    describe('<Orders />', () => {
      it('renders connected Orders Component', () => {
        const wrapper = shallow(<Orders {...ordersProps}/>);
        expect(wrapper.length).to.eql(1);
      });

      it('should get a meal item', () => {
        const wrapper = shallow(<Orders {...ordersProps}/>);
        const response = wrapper.instance().getMealItem(1);
        expect(response).to.eql([ordersProps.mealData[0]])
      });

      it('should compute total amount', () => {
        const wrapper = shallow(<Orders {...ordersProps}/>);
        wrapper.setState({
          cart: [
            { meal: 'vegetables', amount: 200 },
            { meal: 'burger', amount: 400 }
          ]
        });
        const total = wrapper.instance().computeTotalAmount();
        expect(total).to.eql(600)
      });

      it('should change total amount', () => {
        const wrapper = shallow(<Orders {...ordersProps}/>);
        wrapper.setState({
          cart: [
            { menuid: 1, meal: 'vegetables', amount: 200, quantity: 1 },
            { menuid: 2, meal: 'burger', amount: 400, quantity: 1 }
          ]
        });
        const event = {
          target: {
            value: 2
          }
        };
        wrapper.instance().changeAmount(event, 1);
        
        expect(wrapper.instance().state.totalAmount).to.eql(800)
      });
    });

    describe('<Modal />', () => {
      it('renders connected Modal Component', () => {
        const wrapper = shallow(<Modal {...modalProps} />);
        expect(wrapper.length).to.eql(1);
      });
    });
  });
});
