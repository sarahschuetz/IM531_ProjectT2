import React from 'react';
import { mount } from 'enzyme';
import TextInput from '../components/TextInput.jsx';

test('ProjectBarEntry', () => {
  const component = mount(
        <TextInput label={'THIS IS A TESTLABEL'}/>,
    );

  expect(component.text().includes('LABEL')).toBe(true);
});

test('Second ProjectBarEntry', () => {
  const wrapper = mount(
        <TextInput label='Another Label' icon='testpath' placeholder='placeholder'/>,
          );

  expect(wrapper.props().label).toEqual('Another Label');
  expect(wrapper.text().includes('Label')).toBe(true);
  expect(wrapper.props().icon).toEqual('testpath');
  expect(wrapper.props().placeholder).toEqual('placeholder');
});

