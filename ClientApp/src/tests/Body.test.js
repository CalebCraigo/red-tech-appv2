import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Body from '../components/Body.jsx';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });

const mockStore= configureMockStore();
const store = mockStore({});

describe('Body component', () => {
    test('renders', () => {
        const wrapper = shallow(<Provider store={store}> <Body /> </Provider>);

        expect(wrapper.exists()).toBe(true);
    })
});