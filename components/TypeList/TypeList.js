import React from 'react';

export default ({ items, selected }) => <ul className="typeList">{ renderList(items, selected) }</ul>;

const renderListItem = (typeName, selected) => {
  const selectedClassName = selected === typeName ? 'typeList-item--selected' : '';
  return <li key={typeName} className={`typeList-item ${selectedClassName}`}>
    <a className="typeList-anchor" href={`#${typeName}`}>{typeName}</a>
  </li>;
};

const renderList = (items, selected) => {
  if (items.length === 0) {
    return renderNoResults();
  }
  return items.map(typeName => renderListItem(typeName, selected));
};

const renderNoResults = () => <li className="typeList-noResults">No results</li>;
