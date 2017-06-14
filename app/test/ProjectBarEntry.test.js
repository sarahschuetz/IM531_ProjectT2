import React from 'react';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import ProjectBarEntry from './ProjectBarEntryTestFile.jsx';


const initialState = { };
const mockStore = configureStore();
const store = mockStore(initialState);

test('ProjectBarEntry', () => {
  const component = mount(
      <ProjectBarEntry store={store} id={2} name={'test'}/>,
        );
  expect(component.text().includes('test')).toBe(true);
});

test('ProjectProps', () => {
  const wrapper = shallow(<ProjectBarEntry store={store} name="test2!" id={2} />);
  expect(wrapper.props().name).toEqual('test2!');
  expect(wrapper.props().id).toEqual(2);
});

