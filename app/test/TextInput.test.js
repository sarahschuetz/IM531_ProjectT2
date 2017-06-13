import React from 'react';
import { mount } from 'enzyme';
import TextInput from '../components/TextInput.jsx';

test('ProjectBarEntry', () => {
  const component = mount(
        <TextInput label={'THIS IS A TESTLABEL'}/>,
    );

  expect(component.text().includes('LABEL')).toBe(true);
});
