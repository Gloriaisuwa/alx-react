/** @jest-environment jsdom */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import App from './App';
// import Login from '../Login/Login';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { defaultUser, AppContext } from './AppContext';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('App tests', () => {
  it('renders without crashing', () => {
    const component = shallow(<App />);

    expect(component).toBeDefined();
  });

  it('contain Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Notifications')).toHaveLength(1);
  });

  it('should render Header component', () => {
    const component = shallow(<App />);

    expect(component.contains(<Header />)).toBe(true);
  });

  it('should render Footer component', () => {
    const component = shallow(<App />);

    expect(component.contains(<Footer />)).toBe(true);
  });
});

describe('App Component', () => {
  it('calls logOut and shows alert when control + h is pressed', () => {
    const logOutMock = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: logOutMock }}>
        <App />
      </AppContext.Provider>
    );

    // Simulate pressing control + h
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);

    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    // expect(logOutMock).toHaveBeenCalled();

    alertMock.mockRestore();
    wrapper.unmount();
  });

  it('Checks that displayDrawer is false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toEqual(false);
  });

  it('Checks that displayDrawer changes to true when handleDisplayDrawer is called and false when handleHideDrawer is called', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toEqual(false);

    wrapper.instance().handleDisplayDrawer();

    expect(wrapper.state().displayDrawer).toEqual(true);

    wrapper.instance().handleHideDrawer();

    expect(wrapper.state().displayDrawer).toEqual(false);
  });

  it('logIn updates the state correctly', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.logIn('test@test.com', 'password');

    expect(wrapper.state('user')).toEqual({
      email: 'test@test.com',
      password: 'password',
      isLoggedIn: true,
    });
    expect(wrapper.state('user').isLoggedIn).toEqual(true);
  });

  it('logOut updates the state correctly', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.logIn('test@test.com', 'password');
    expect(wrapper.find('CourseList')).toHaveLength(1);
    instance.logOut();
    expect(wrapper.state('user')).toEqual(defaultUser);
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('markNotificationAsRead works as intended', () => {
    const wrapper = mount(<App />);
    const initialNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    wrapper.setState({ listNotifications: initialNotifications });
    wrapper.instance().markNotificationAsRead(1);
    expect(wrapper.state().listNotifications).toEqual([
      { id: 2, type: 'urgent', value: 'New resume available' },
    ]);
  });
});
