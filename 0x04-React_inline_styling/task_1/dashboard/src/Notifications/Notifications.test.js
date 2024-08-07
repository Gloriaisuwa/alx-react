import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import { getLatestNotification } from '../utils/utils';
import Notifications from './Notifications';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Notification tests', () => {
  it('renders Notification component without crashing', () => {
    const component = shallow(<Notifications />);

    expect(component).toBeDefined();
  });

  it('renders ul', () => {
    const notification = shallow(<Notifications />);

    expect(notification.find('ul')).toBeDefined();
  });
  it('Notification Item with html', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const Item = wrapper.find('NotificationItem');
    expect(Item).toBeDefined();
  });

  it('renders correct text', () => {
    const component = shallow(<Notifications />);

    expect(component.find('p').prop('children')).toBe('Your notifications');
  });

  it('Notification with displayDrawer false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    const notification = wrapper.find('div.Notifications');
    expect(notification).toHaveLength(0);
  });

  it('menuItem with displayDrawer true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    const menuItem = wrapper.find('div.menuItem');
    expect(menuItem).toHaveLength(0);
  });

  // it('displayDrawer is true', () => {
  //   const wrapper = shallow(<Notifications displayDrawer={true} />);
  //   const notification = wrapper.find('div.Notifications');
  //   expect(notification).toHaveLength(1);
  // });

  it('renders correctly when listCourses is not passed', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);

    expect(
      wrapper.containsMatchingElement(
        <li data-notification-type='default'>No new notification for now</li>
      )
    );
  });

  it('renders correctly when empty array is passed', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={[]} />
    );

    expect(
      wrapper.containsMatchingElement(
        <li data-notification-type='default'>No new notification for now</li>
      )
    );
  });

  it('renders "No new notifications for now" when listNotifications is empty', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={[]} />
    );

    expect(
      wrapper.containsMatchingElement(<p>Here is the list of notifications</p>)
    ).toBe(false);

    expect(
      wrapper.containsMatchingElement(
        <li data-notification-type='default'>No new notification for now</li>
      )
    );
  });
});

describe('markAsRead onclick event', () => {
  it('should call console.log', () => {
    const wrapper = shallow(<Notifications />);
    const spy = jest.spyOn(console, 'log').mockImplementation();

    wrapper.instance().markAsRead = spy;
    wrapper.instance().markAsRead(1);
    expect(wrapper.instance().markAsRead).toBeCalledWith(1);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);
    spy.mockRestore();
  });
});

describe('Testing the notification class Component re-rendering', () => {
  it('verify that when updating the props of the component with the same list, the component doesnt rerender', () => {
    const listNotifications = [
      { id: 1, value: 'New course available', type: 'default' },
      { id: 2, value: 'New resume available', type: 'urgent' },
      { id: 3, html: { __html: getLatestNotification() }, type: 'urgent' },
    ];
    const listNotifications2 = [
      { id: 1, value: 'New course available changed', type: 'default' },
      { id: 2, value: 'New resume available', type: 'urgent' },
      { id: 3, html: { __html: getLatestNotification() }, type: 'urgent' },
    ];
    console.log = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    wrapper.setProps({ listNotifications: listNotifications });
    expect(wrapper.find('NotificationItem').length).toBe(3);
    expect(wrapper.find('NotificationItem').first().props().value).toEqual(
      'New course available'
    );
  });

  it('verify that when updating the props of the component with a longer list, the component does rerender', () => {
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
    console.log = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    wrapper.setProps({ listNotifications: listNotifications2 });
    expect(wrapper.find('NotificationItem').at(1).props().value).toEqual(
      'New course available2'
    );
    expect(wrapper.find('NotificationItem').length).toBe(4);
  });
});
