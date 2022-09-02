import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import CreateOrder from '../components/CreateOrder.jsx';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({});

describe('CreateOrder component', () => {
    test('renders', () => {
        const wrapper = shallow(<Provider store={store}><CreateOrder open={true}/></Provider>);

        expect(wrapper.exists()).toBe(true);
    })
});