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

const getSourceCodeExampleForType = (type) => {
  const { buildParams, typeName } = type;
  const fnName = typeName.substr(0, 1).toLowerCase() + typeName.substr(1);
  if (buildParams) {
    const argsDefinitions = buildParams.map(constName => printConst(type, constName)).join('\n');
    return `${argsDefinitions}\n\nconst node = jscodeshift.${fnName}(${buildParams.join(', ')});`;
  }
  return `const node = jscodeshift.${fnName}();`;
}

export default ({ type }) => (
  <code className="sourceCode">
    { getSourceCodeExampleForType(type) }
  </code>
);
