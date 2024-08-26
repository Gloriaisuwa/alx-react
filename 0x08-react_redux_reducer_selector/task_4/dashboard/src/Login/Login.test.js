import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Login from './Login';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Login Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('renders 3 input tags and 2 label tags', () => {
    expect(wrapper.find('input')).toHaveLength(3);
    expect(wrapper.find('label')).toHaveLength(2);
  });

  it('should have the submit button disabled by default', () => {
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.props().disabled).toBe(true);
  });

  it('should enable the submit button after entering email and password', () => {
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="psw"]');
    const submitButton = wrapper.find('input[type="submit"]');

    // Simulate user input
    emailInput.simulate('change', { target: { value: 'test@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });

    // Re-fetch the submit button to get the updated props
    const updatedSubmitButton = wrapper.find('input[type="submit"]');
    expect(updatedSubmitButton.props().disabled).toBe(false);
  });
});
