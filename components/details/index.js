import React from 'react';
import astTypes from 'ast-types';

const getFieldsForTypeName = (typeName) => {
  const result = [];
  astTypes.eachField({ type: typeName }, (name, value) => {
    result.push({ name, value });
  });
  return result;
}

const renderFieldValue = (value) => {
  if (typeof value === 'undefined') {
    return 'undefined';
  }
  return JSON.stringify(value);
}

const renderField = ({ name, value }) => {
  return <li key={name}><label>{name}</label> {renderFieldValue(value)}</li>;
}

const renderList = (typeName) => {
  return getFieldsForTypeName(typeName).map(field => renderField(field));
}

export default ({ typeName }) => (
  <div>
    <h3>{typeName}</h3>

    <h4>Fields:</h4>
    <ul>
      { renderList(typeName) }
    </ul>
  </div>
);
