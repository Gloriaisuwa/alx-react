import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('<BodySectionWithMarginBottom />', () => {
  it('component and props', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title='test title'>
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );
    const div = wrapper.find('.bodySectionWithMargin').first();
    const BodySection = wrapper.find('BodySection');
    const internalBody = BodySection.dive();
    const h2 = internalBody.find('h2');
    const p = internalBody.find('p');
    expect(div.exists()).toEqual(false);
    expect(BodySection).toHaveLength(1);
    expect(BodySection.props().title).toEqual('test title');
    expect(h2).toHaveLength(1);
    expect(h2.text()).toEqual('test title');
    expect(p).toHaveLength(1);
    expect(p.text()).toEqual('test children node');
  });
});
