import Enzyme, { shallow, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

test('App Component renders', () => {
  const wrapper = shallow(<App open={true}/>);

  expect(wrapper.exists()).toBe(true);
});
