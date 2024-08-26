/** @jest-environment jsdom */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext, defaultUser } from '../App/AppContext';
import Header from './Header';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Header Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('renders img and h1 tags', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists('img')).toEqual(true);
    expect(wrapper.containsMatchingElement(<h1>School dashboard</h1>)).toEqual(
      true
    );
  });

  it('does not render logout section if not logged in', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').length).toBe(0);
  });

  it('renders logout section if logged in', () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      isLoggedIn: true,
    };
    const wrapper = mount(
      <AppContext.Provider value={{ user }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').length).toBe(1);
  });

  it('calls logOut function on clicking logout link', () => {
    const logOut = jest.fn();
    const user = {
      email: 'test@test.com',
      password: 'password',
      isLoggedIn: true,
    };
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <Header />
      </AppContext.Provider>
    );
    wrapper.find('#logoutSection a').simulate('click');
    expect(logOut).toHaveBeenCalled();
  });
});
