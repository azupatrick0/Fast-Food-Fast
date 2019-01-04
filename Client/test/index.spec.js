import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Routes from '../src/routes/index';
import { Footer, NavBar, NotFound, Signup } from '../src/components';
import { HomePage } from '../src/components/NavBar';
import LandingPage, { Slide0, Slide1, Slide2 } from '../src/components/landingPage';

require('browser-env')();

configure({ adapter: new Adapter() });

describe('Fast-Food-Fast Client Test Suite', () => {
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
        expect(wrapper.html().length).to.eql(81);
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
        const wrapper = shallow(<LandingPage />)
        const wrapper2 = shallow(<Slide0 />)
        const wrapper3 = shallow(<Slide1 />)
        const wrapper4 = shallow(<Slide2 />)
        const wrapper5 = shallow(<Footer />)
        expect(wrapper.length).to.eql(1);
        expect(wrapper.contains(<NavBar View='homePage' />)).to.equal(true);
        expect(wrapper.contains(<Slide0 />)).to.equal(true);
        expect(wrapper.contains(<Slide1 />)).to.equal(true);
        expect(wrapper.contains(<Slide2 />)).to.equal(true);
        expect(wrapper.contains(<Footer />)).to.equal(true);
        expect(wrapper2.html().length).to.eql(330);
        expect(wrapper3.html().length).to.eql(1192);
        expect(wrapper4.html().length).to.eql(1343);
        wrapper2.find('button').simulate('click');
        wrapper3.find('button').simulate('click');
        wrapper4.find('button').at(0).simulate('click');
        wrapper4.find('button').at(1).simulate('click');
        wrapper4.find('button').at(2).simulate('click');
        wrapper5.find('a').simulate('click');
      });
    });

    describe('<Signup />', () => {
      it('renders Signup Component', () => {
      //   const signupAction =  dispatch({
      //     type: USER_SIGNUP_SUCCESS,
      //     payload: response.data.userDetails
      // });
        const wrapper = shallow(<Signup />);
        expect(wrapper.length).to.eql(1);
        // wrapper.find('.accept-btn').simulate('click');
      });
    });
  });
});
