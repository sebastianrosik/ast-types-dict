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
  const hiddenEmblem = <span className="field-hidden">(hidden)</span>;
  return <li key={name} className="fieldsList-item"><label className="field-name">{name}</label> <span className="field-value">{renderFieldValue(value)} {hidden ? hiddenEmblem : ''}</span></li>;
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
  if (!ownFields[constName]) {
    return `const ${constName};`;
  }
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

const isBuildable = (typeName) => {
  const { buildable } = Type.def(typeName);
  return buildable;
}

export default ({ typeName }) => (
  <div className="typeDetails">
    <h3 className="typeDetails-heading">{typeName}</h3>

    <h4 className="typeDetails-subHeading">Base</h4>
    <ul>
      { renderBaseTypes(typeName) }
    </ul>

    <h4 className="typeDetails-subHeading">Fields</h4>
    <ul className="fieldsList">
      { renderFields(typeName) }
    </ul>

    <h4 className="typeDetails-subHeading">Building</h4>
    {
      isBuildable(typeName)
      ?
      <code className="typeDetails-source">
        { renderSource(typeName)}
      </code>
      :
      "This Type is not buildable."
    }
  </div>
);
