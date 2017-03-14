import React from 'react';
import {shallow} from 'enzyme';
import TypeList from '../TypeList';

test('Renders the right amount of items', () => {
  const items = ['a','b'];
  const component = shallow(<TypeList items={items} />);
  expect(component.find('li').length).toEqual(2);
});

test('Displays the name of the rendered Type', () => {
  const items = ['a'];
  const component = shallow(<TypeList items={items} />);
  expect(component.find('li a').text()).toEqual(items[0]);
});

test('Selectes the right item on the list', () => {
  const items = ['a', 'b', 'c'];
  const selectedTypeName = items[1];
  const component = shallow(<TypeList items={items} selected={selectedTypeName} />);
  const selectedItem = component.find('.typeList-item--selected');
  expect(selectedItem.text()).toEqual(selectedTypeName);
});
