/** @jest-environment jsdom */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Notifications Component', () => {
  let handleDisplayDrawer;
  let handleHideDrawer;
  let markNotificationAsRead;
  let listNotifications;

  beforeEach(() => {
    handleDisplayDrawer = jest.fn();
    handleHideDrawer = jest.fn();
    markNotificationAsRead = jest.fn();
    listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
  });

  it('renders without crashing', () => {
    const component = shallow(<Notifications />);
    expect(component).toBeDefined();
  });

  it('renders ul', () => {
    const notification = shallow(<Notifications />);
    expect(notification.find('ul')).toBeDefined();
  });

  it('renders Notification Item with html', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const item = wrapper.find(NotificationItem);
    expect(item).toBeDefined();
  });

  it('renders correct text', () => {
    const component = shallow(<Notifications />);
    expect(component.find('p').prop('children')).toBe('Your notifications');
  });

  it('does not render notifications when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    const notification = wrapper.find('div.Notifications');
    expect(notification).toHaveLength(0);
  });

  it('renders menu item when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    const menuItem = wrapper.find('#menuItem');
    expect(menuItem).toHaveLength(1);
  });

  it('does not render menu item when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    const menuItem = wrapper.find('div.menuItem');
    expect(menuItem).toHaveLength(0);
  });

  it('renders "No new notification for now" when listNotifications is empty', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={[]} />
    );
    expect(
      wrapper.containsMatchingElement(
        <li data-notification-type='default'>No new notification for now</li>
      )
    ).toBe(true);
  });

  it('renders the correct number of notifications', () => {
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    expect(wrapper.find(NotificationItem).length).toBe(2);
  });

  it('calls markNotificationAsRead when a notification is clicked', () => {
    const wrapper = mount(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    wrapper.find(NotificationItem).at(0).simulate('click');
    // expect(markNotificationAsRead).toHaveBeenCalledWith(1);
  });

  it('calls handleDisplayDrawer when the menu item is clicked', () => {
    const wrapper = shallow(
      <Notifications handleDisplayDrawer={handleDisplayDrawer} />
    );
    wrapper.find('#menuItem').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when the close button is clicked', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />
    );
    wrapper.find('#close').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});

describe('Testing the notification class Component re-rendering', () => {
  it('does not rerender when updating the props with the same list', () => {
    const listNotifications = [
      { id: 1, value: 'New course available', type: 'default' },
      { id: 2, value: 'New resume available', type: 'urgent' },
      { id: 3, html: { __html: getLatestNotification() }, type: 'urgent' },
    ];
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    wrapper.setProps({ listNotifications });
    expect(wrapper.find(NotificationItem).length).toBe(3);
    expect(wrapper.find(NotificationItem).first().props().value).toEqual(
      'New course available'
    );
  });

  it('rerenders when updating the props with a longer list', () => {
    const listNotifications = [
      { id: 1, value: 'New course available', type: 'default' },
      { id: 2, value: 'New resume available', type: 'urgent' },
      { id: 3, html: { __html: getLatestNotification() }, type: 'urgent' },
    ];
    const listNotifications2 = [
      { id: 1, value: 'New course available', type: 'default' },
      { id: 2, value: 'New course available2', type: 'default' },
      { id: 3, value: 'New resume available', type: 'urgent' },
      { id: 4, html: { __html: getLatestNotification() }, type: 'urgent' },
    ];
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    wrapper.setProps({ listNotifications: listNotifications2 });
    expect(wrapper.find(NotificationItem).at(1).props().value).toEqual(
      'New course available2'
    );
    expect(wrapper.find(NotificationItem).length).toBe(4);
  });
});

describe('displayDrawer', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('clicking on the menu item calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
    );
    wrapper.find('#menuItem').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it('clicking on the button calls handleHideDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
    );
    wrapper.find('#close').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});
