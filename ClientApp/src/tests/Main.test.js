import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Main from '../components/Main.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Main component', () => {
    test('renders', () => {
        const wrapper = shallow(<Main />);

        expect(wrapper.exists()).toBe(true);
    })
});