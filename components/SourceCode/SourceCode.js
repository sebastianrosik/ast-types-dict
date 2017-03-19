import React from 'react';
import ParamValue from '../ParamValue';

import { descendants } from '../../lib';

const printConst = (type, constName) => {
  const { ownFields } = type;
  if (!ownFields[constName]) {
    return `const ${constName};`;
  }
  const { name } = ownFields[constName].type;
  const value = typeof name === 'function' ? name() : name;
  return <span>const {constName} = <ParamValue descendants={descendants}>{value}</ParamValue></span>;
}

const getBuildParamsExplanation = (type, buildParams) => {
  const params = buildParams.map(constName => printConst(type, constName));
  return params;
}

const getSourceCodeExampleForType = (type) => {
  const { buildParams, typeName } = type;
  const fnName = typeName.substr(0, 1).toLowerCase() + typeName.substr(1);
  const sourceCode = [];

  let params = '';

  sourceCode.push(`import astTypes from 'ast-types';`);
  sourceCode.push('');

  if (buildParams.length) {
    params = buildParams.join(', ');
    sourceCode.push(...getBuildParamsExplanation(type, buildParams));
    sourceCode.push('');
  }

  sourceCode.push(`const node = astTypes.builders.${fnName}(${params});`);

  return sourceCode;
}

export default ({ type }) => {
  const lines = getSourceCodeExampleForType(type);
  return <div className="sourceCode">{
    lines.map((line, lineNumber) => <code className="sourceCode-line" key={lineNumber}>{line}</code>)
  }</div>;
};
