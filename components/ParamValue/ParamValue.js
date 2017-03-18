import React from 'react';

const TypeSelect = ({ children, typeDescendants }) => {
  const typeName = children;
  const options = [typeName, ...typeDescendants];
  return <select>{
    options.map(option => <option key={option}>{option}</option>)
  }</select>;
};

const divideTypes = (typesString, descendants) => {
  return typesString
   .split('|')
   .map(typeName => typeName.trim())
   .map(typeName => {
     const typeDescendants = descendants[typeName];
     return <strong key={typeName}>{
        typeDescendants === undefined ? typeName : <TypeSelect typeDescendants={typeDescendants}>{typeName}</TypeSelect>
      }</strong>;
  });
};

export default ({ children, descendants }) => {
  const isArray = /^\[.*\]$/.test(children);
  const values = divideTypes(children.replace(/\[|\]/g, ''), descendants);
  return isArray ? <span>[ {values} ]</span> : <span>{values}</span>;
};
