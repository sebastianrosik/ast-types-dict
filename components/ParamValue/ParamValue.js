import React from 'react';
import TypeSelect from '../TypeSelect';

const renderTypeSelect = (typeName, typeDescendants) => {
  return typeDescendants === undefined ? typeName : <TypeSelect typeDescendants={typeDescendants}>{typeName}</TypeSelect>
};

const insertSeparatorsBetweentArrayItem = (array) => {
  for (let index = 1, goalLength = array.length * 2 - 2; index <= goalLength; index += 2) {
    array.splice(index, 0, <span key={index} className="paramValue-separator"> | </span>);
  }
  return array;
};

const renderType = (typeName, descendants) => {
  const typeDescendants = descendants[typeName];
  return <strong key={typeName} className="paramValue-item">
   {renderTypeSelect(typeName, typeDescendants)}
  </strong>;
}

const divideTypes = (typesString, descendants) => {
  return insertSeparatorsBetweentArrayItem(
    typesString
     .split('|')
     .map(typeName => typeName.trim())
     .map(typeName => renderType(typeName, descendants))
   );
};

export default ({ children, descendants }) => {
  const isArray = /^\[.*\]$/.test(children);
  const values = divideTypes(children.replace(/\[|\]/g, ''), descendants);
  return isArray ? <span>[ {values} ]</span> : <span>{values}</span>;
};
