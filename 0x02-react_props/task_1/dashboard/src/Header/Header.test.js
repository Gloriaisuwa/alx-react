import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

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
});
