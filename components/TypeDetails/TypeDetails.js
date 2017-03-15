import React from 'react';

import SuperTypes from '../SuperTypes';
import SourceCode from '../SourceCode';

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

const isBuildable = (type) => type.buildable;

export default ({ type, astTypes }) => (
  <div className="typeDetails">
    <h3 className="typeDetails-heading">{type.typeName}</h3>

    <h4 className="typeDetails-subHeading">Base</h4>
    <SuperTypes type={type} astTypes={astTypes} />

    <h4 className="typeDetails-subHeading">Fields</h4>
    <ul className="fieldsList">
      { renderFields(type) }
    </ul>

    <h4 className="typeDetails-subHeading">Building</h4>
    {
      isBuildable(type)
      ?
      <div className="typeDetails-source">
        <SourceCode type={type} />
      </div>
      :
      <p className="typeDetails-info">This Type is not buildable.</p>
    }
  </div>
);
