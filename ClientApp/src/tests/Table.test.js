import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Table from '../components/Table.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Table component', () => {
    test('renders', () => {
        const wrapper = shallow(<Table/>);

        expect(wrapper.exists()).toBe(true);
    })
});