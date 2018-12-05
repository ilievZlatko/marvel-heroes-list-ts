import React from 'react';
import { shallow, mount } from 'enzyme';

import Loading from './Loading';

describe('Loading component', () => {
    it('renders without crashing', () => {
        const wrap = mount(<Loading />);

        expect(wrap).toMatchSnapshot();
    });

    it('should render spinning svg', () => {
        const wrapper = shallow(<Loading />);

        expect(
            wrapper.containsMatchingElement(<img />)
        ).toBeTruthy();
    });
});