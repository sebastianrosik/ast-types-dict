import React from 'react';
import astTypes from 'ast-types';

const { Type } = astTypes;

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

const renderField = ({ name, value, hidden }) => {
  return <li key={name}><label>{name}</label> {renderFieldValue(value)} {hidden ? '(hidden)' : ''}</li>;
}

const renderFields = (typeName) => {
  const { allFields } = Type.def(typeName);
  if (allFields.length === 0) {
    return <em>None</em>;
  }
  return Object.keys(allFields).map(fieldName => renderField(allFields[fieldName]));
}

const printConst = (typeName, constName) => {
  const { ownFields } = Type.def(typeName);
  const name = ownFields[constName].type.name;
  const value = typeof name === 'function' ? name() : name;
  return `const ${constName} = ${value};`
}

const renderSource = (typeName) => {
  const { buildParams } = Type.def(typeName);
  const fnName = typeName.substr(0, 1).toLowerCase() + typeName.substr(1);
  if (buildParams) {
    const argsDefinitions = buildParams.map(constName => printConst(typeName, constName)).join('\n');
    return `${argsDefinitions}\n\nconst node = jscodeshift.${fnName}(${buildParams.join(', ')});`;
  }
  return `const node = jscodeshift.${fnName}();`;
}


const renderBaseTypes = (typeName) => {
  const { baseNames } = Type.def(typeName);
  if (baseNames.length === 0) {
    return <em>None</em>;
  }
  return baseNames.map(baseName => <li key={baseName}><a href={`#${baseName}`}>{baseName}</a></li>)
}

export default ({ typeName }) => (
  <div>
    <h3>{typeName}</h3>

    <h4>Base:</h4>
    <ul>
      { renderBaseTypes(typeName) }
    </ul>

    <h4>Fields:</h4>
    <ul>
      { renderFields(typeName) }
    </ul>

    <h4>Example:</h4>
    <code>
      { renderSource(typeName)}
    </code>
  </div>
);
