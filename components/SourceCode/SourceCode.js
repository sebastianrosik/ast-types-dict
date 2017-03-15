import React from 'react';

const printConst = (type, constName) => {
  const { ownFields } = type;
  if (!ownFields[constName]) {
    return `const ${constName};`;
  }
  const { name } = ownFields[constName].type;
  const value = typeof name === 'function' ? name() : name;
  return `const ${constName} = ${value};`
}

const getBuildParamsExplanation = (type, buildParams) => {
  return buildParams.map(constName => printConst(type, constName)).join('\n');
}

const getSourceCodeExampleForType = (type) => {
  const { buildParams, typeName } = type;
  const fnName = typeName.substr(0, 1).toLowerCase() + typeName.substr(1);
  const sourceCode = [];
  let params = '';

  sourceCode.push('import astTypes from \'ast-types\';');
  sourceCode.push('\n');

  if (buildParams.length) {
    params = buildParams.join(', ');
    sourceCode.push(getBuildParamsExplanation(type, buildParams));
    sourceCode.push('\n');
  }

  sourceCode.push(`const node = astTypes.builders.${fnName}(${params});`);

  return sourceCode.join('\n');
}

export default ({ type }) => (
  <code className="sourceCode">
    { getSourceCodeExampleForType(type) }
  </code>
);
