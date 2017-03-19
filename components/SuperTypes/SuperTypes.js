import React from 'react';

const renderSupertypesNames = (types) => types.map(typeName => {
  return <li key={typeName} className="superTypes-item">
    <a href={`#${typeName}`}>{typeName}</a>
  </li>
});

export default ({ type, astTypes }) => {
  const types = astTypes.getSupertypeNames(type.typeName);
  if (types.length === 0) {
    return <em>None</em>;
  }
  return <ul className="superTypes">
    { renderSupertypesNames(types.reverse()) }
    <li key={type.typeName} className="superTypes-item">{type.typeName}</li>
  </ul>;
};
