/** @jest-environment jsdom */
import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

describe('WithLogging HOC', () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('logs on mount and unmount with pure HTML element', () => {
    const PureHtmlComponent = WithLogging(() => <p />);
    const wrapper = mount(<PureHtmlComponent />);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Component Component is mounted'
    );

    wrapper.unmount();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Component Component is going to unmount'
    );
  });

  it('logs on mount and unmount with Login component', () => {
    const LoginWithLogging = WithLogging(Login);
    const wrapper = mount(<LoginWithLogging />);

    expect(consoleLogSpy).toHaveBeenCalledWith('Component Login is mounted');

    wrapper.unmount();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Component Login is going to unmount'
    );
  });
});
