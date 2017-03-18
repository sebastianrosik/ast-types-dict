import astTypes from 'ast-types';
const { Type } = astTypes;

const allTypeNames = Object.keys(astTypes.namedTypes);

export const getDescendantsForTypeName = (parentTypeName) => {
  return allTypeNames
    .filter(childTypeName => {
      const { supertypeList } = Type.def(childTypeName);
      return supertypeList.includes(parentTypeName);
    })
    .filter(childTypeName => childTypeName !== parentTypeName);
};

export const descendants = {};

allTypeNames.forEach(typeName => {
  descendants[typeName] = getDescendantsForTypeName(typeName);
});
