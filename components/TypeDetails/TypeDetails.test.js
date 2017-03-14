import React from 'react';
import {shallow} from 'enzyme';
import TypeDetails from '../TypeDetails';

const createType = (options = {}) => Object.assign({
  typeName: 'testType',
  buildable: false,
  ownFields: [],
  baseNames: [],
  allFields: []
}, options);

test('Prints source if type is buildable', () => {
  const type = createType({
    buildable: true
  });
  const component = shallow(<TypeDetails type={type} />);
  expect(component.find('.typeDetails-source').length).toEqual(1);
});

test('Prints information if type is unbuildable', () => {
  const type = createType({
    buildable: false
  });
  const component = shallow(<TypeDetails type={type} />);
  expect(component.find('.typeDetails-source').length).toEqual(0);
  expect(component.find('.typeDetails-info').text()).toMatch(/Type.*not.*buildable/);
});
