import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Routes from '../src/routes/index';
import { Footer, NavBar, NotFound, Signup, Signin, History, Orders } from '../src/components';
import { HomePage, OrdersPage, HistoryPage } from '../src/components/NavBar';
import LandingPage, { Slide0, Slide1, Slide2 } from '../src/components/landingPage';
import { ValidateUserDetails } from '../js/utils';

require('browser-env')();

configure({ adapter: new Adapter() });

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
        expect(wrapper.html().length).to.eql(56);
      });
    });

    describe('<NavBar />', () => {
      delete window.location;
      window.location = {};
      it('renders NavBar Component', () => {
        const wrapper = shallow(<NavBar View='homePage' />);
        const wrapper2 = shallow(<HomePage />);
        const wrapper3 = shallow(<OrdersPage />);
        const wrapper4 = shallow(<HistoryPage />);
        wrapper3.find('.signout').simulate('click');
        wrapper3.find('.history').simulate('click');
        wrapper3.find('.signout-orderpage').simulate('click');
        wrapper4.find('.signout-historypage').simulate('click');
        wrapper4.find('.historypage-history').simulate('click');
        wrapper4.find('.historypage-history-signout').simulate('click');
        expect(wrapper.length).to.eql(1);
        expect(wrapper.instance().props.View).to.be.a('string');
        expect(wrapper.instance().props.View.length).to.be.gt(0);
        expect(wrapper.contains(<HomePage />)).to.equal(true);
        expect(wrapper2.html().length).to.eql(757);
        wrapper2.find('button').simulate('click');
      });
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
        const wrapper = mount(<LandingPage />)
        const wrapper2 = mount(<Slide0 />)
        const wrapper3 = mount(<Slide1 />)
        const wrapper4 = mount(<Slide2 />)
        expect(wrapper.length).to.eql(1);
        expect(wrapper.contains(<NavBar View='homePage' />)).to.equal(true);
        expect(wrapper.contains(<Slide0 />)).to.equal(true);
        expect(wrapper.contains(<Slide1 />)).to.equal(true);
        expect(wrapper.contains(<Slide2 />)).to.equal(true);
        expect(wrapper.contains(<Footer />)).to.equal(true);
        expect(wrapper2.html().length).to.eql(326);
        expect(wrapper3.html().length).to.eql(1173);
        expect(wrapper4.html().length).to.eql(1326);
        wrapper2.find('button').simulate('click');
        wrapper3.find('button').simulate('click');
        wrapper4.find('button').at(0).simulate('click');
        wrapper4.find('button').at(1).simulate('click');
        wrapper4.find('button').at(2).simulate('click');
      });
    });

    describe('<Signup />', () => {
      it('renders connected Signup Component', () => {
        const wrapper = mount(<Signup act={()=> 'clicked me'}/>);
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
        const wrapper = shallow(<History act={()=> 'clicked me'}/>);
        expect(wrapper.length).to.eql(1);   
      });
    });

    describe('<Orders />', () => {
      
      it('renders connected Orders Component', () => {
        const wrapper = shallow(<Orders act={()=> 'clicked me'}/>);
        expect(wrapper.length).to.eql(1);
        wrapper.find('.order-button').simulate('click');
      });
    });
  });
});
