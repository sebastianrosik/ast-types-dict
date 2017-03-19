import React from 'react';

import SuperTypes from '../SuperTypes';
import SourceCode from '../SourceCode';

const isBuildable = (type) => type.buildable;

const renderDetailsContent = (type, astTypes) => {
  return [
    <header className="typeDetails-header" key="header">
        <h3 className="typeDetails-heading">{type.typeName}</h3>
        <nav className="typeDetails-breadcrumb">
          <SuperTypes type={type} astTypes={astTypes} />
        </nav>
    </header>,
    isBuildable(type)
    ?
    <div className="typeDetails-source" key="body">
      <SourceCode type={type} />
    </div>
    :
    <p className="typeDetails-info" key="body">This Type is not buildable.</p>
  ];
};

const renderEmptyDetailsContent = () => <div className="typeDetails-empty">
  <p>Select a Type from list on the left to display details.</p>
</div>;

export default ({ type, astTypes }) => <div className="typeDetails">
  { !!type ? renderDetailsContent(type, astTypes) : renderEmptyDetailsContent() }
</div>;
