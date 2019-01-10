import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Routes from '../src/routes/index';
import { Footer, NavBar, NotFound, Signup } from '../src/components';
import { HomePage } from '../src/components/NavBar';
import LandingPage, { Slide0, Slide1, Slide2 } from '../src/components/landingPage';

require('browser-env')();

configure({ adapter: new Adapter() });

describe('Fast-Food-Fast Client Components Test Suite', () => {
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
        expect(wrapper.length).to.eql(1);
        expect(wrapper.instance().props.View).to.be.a('string');
        expect(wrapper.instance().props.View.length).to.be.gt(0);
        expect(wrapper.contains(<HomePage />)).to.equal(true);
        expect(wrapper2.html().length).to.eql(754);
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
        const userName = <input className="signupName" value="myname"/>
        wrapper.find('.form').simulate('keyup',userEmail,userPassword,userName,event4);
      });
    });
  });
});