import React from 'react';
import { shallow } from 'enzyme';
import { getLatestNotification } from '../utils/utils';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

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
    expect(Item.first().html()).toEqual(
      '<li data-notification-type="default">New course available</li>'
    );
  });

  it('renders correct text', () => {
    const component = shallow(<Notifications />);

    expect(component.find('p').prop('children')).toBe('Your notifications');
  });

  it('menuItem with displayDrawer false', () => {
    const wrapper = shallow(<Notifications />);
    const menuItem = wrapper.find('div.menuItem');
    expect(menuItem).toHaveLength(1);
  });

  it('Notification with displayDrawer false', () => {
    const wrapper = shallow(<Notifications />);
    const notification = wrapper.find('div.Notifications');
    expect(notification).toHaveLength(0);
  });

  it('menuItem with displayDrawer true', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const menuItem = wrapper.find('div.menuItem');
    expect(menuItem).toHaveLength(1);
  });

  it('displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const notification = wrapper.find('div.Notifications');
    expect(notification).toHaveLength(1);
  });
});
