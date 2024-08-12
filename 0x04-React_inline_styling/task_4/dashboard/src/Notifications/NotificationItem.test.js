import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import NotificationItem from './NotificationItem';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('rendering components', () => {
  it('renders NotificationItem component without crashing', () => {
    const wrapper = shallow(<NotificationItem />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct html from type="default" value="test" props', () => {
    const wrapper = shallow(<NotificationItem />);

    wrapper.setProps({ type: 'default', value: 'test' });
    expect(wrapper.html()).toEqual(
      '<div><li data-notification-type="default" class="default_1tsdo2i">test</li></div>'
    );
  });

  it('renders correct html from html="<u>test</u>" props', () => {
    const wrapper = shallow(<NotificationItem />);

    wrapper.setProps({ html: '<u>test</u>' });
    expect(wrapper.html()).toEqual(
      '<div><li data-notification-type="default" class="default_1tsdo2i"><u>test</u></li></div>'
    );
  });
});
