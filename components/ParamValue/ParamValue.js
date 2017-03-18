import React from 'react';

import TypeSelect from '../TypeSelect';

const divideTypes = (typesString, descendants) => {
  return typesString
   .split('|')
   .map(typeName => typeName.trim())
   .map(typeName => {
     const typeDescendants = descendants[typeName];
     return <strong key={typeName} className="paramValue-item">{
        typeDescendants === undefined ? typeName : <TypeSelect typeDescendants={typeDescendants}>{typeName}</TypeSelect>
      }</strong>;
  });
};

export default ({ children, descendants }) => {
  const isArray = /^\[.*\]$/.test(children);
  const values = divideTypes(children.replace(/\[|\]/g, ''), descendants);
  return isArray ? <span>[ {values} ]</span> : <span>{values}</span>;
};
