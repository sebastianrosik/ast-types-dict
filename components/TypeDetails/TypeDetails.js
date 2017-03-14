import React from 'react';

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

const renderFields = (type) => {
  const { allFields } = type;
  if (allFields.length === 0) {
    return <em>None</em>;
  }
  return Object.keys(allFields).map(fieldName => renderField(allFields[fieldName]));
}

const printConst = (type, constName) => {
  const { ownFields } = type;
  if (!ownFields[constName]) {
    return `const ${constName};`;
  }
  const { name } = ownFields[constName].type;
  const value = typeof name === 'function' ? name() : name;
  return `const ${constName} = ${value};`
}

const renderSource = (type) => {
  const { buildParams, typeName } = type;
  const fnName = typeName.substr(0, 1).toLowerCase() + typeName.substr(1);
  if (buildParams) {
    const argsDefinitions = buildParams.map(constName => printConst(type, constName)).join('\n');
    return `${argsDefinitions}\n\nconst node = jscodeshift.${fnName}(${buildParams.join(', ')});`;
  }
  return `const node = jscodeshift.${fnName}();`;
}

const renderBaseTypes = (type) => {
  const { baseNames } = type;
  if (baseNames.length === 0) {
    return <em>None</em>;
  }
  return baseNames.map(baseName => <li key={baseName}><a href={`#${baseName}`}>{baseName}</a></li>)
}

const isBuildable = (type) => type.buildable;

export default ({ type }) => (
  <div className="typeDetails">
    <h3 className="typeDetails-heading">{type.typeName}</h3>

    <h4 className="typeDetails-subHeading">Base</h4>
    <ul>
      { renderBaseTypes(type) }
    </ul>

    <h4 className="typeDetails-subHeading">Fields</h4>
    <ul className="fieldsList">
      { renderFields(type) }
    </ul>

    <h4 className="typeDetails-subHeading">Building</h4>
    {
      isBuildable(type)
      ?
      <code className="typeDetails-source">
        { renderSource(type)}
      </code>
      :
      <p className="typeDetails-info">This Type is not buildable.</p>
    }
  </div>
);
