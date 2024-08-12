import React from 'react';
import { shallow } from 'enzyme';
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
