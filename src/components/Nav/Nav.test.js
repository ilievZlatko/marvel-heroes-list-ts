import React from 'react';
import { shallow } from 'enzyme';

import Nav from './Nav';

describe('Nav component', () => {
    it('should contain 2 links', () => {
        const wrap = shallow(<Nav />);

        expect(wrap.find('li')).toHaveLength(2);
    });
});