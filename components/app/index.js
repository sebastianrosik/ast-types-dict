import React from 'react';
import astTypes from 'ast-types';

import Details from '../details';

const { namedTypes } = astTypes;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      selectedTypeName: null
    }
    this.isQueryMatchingTypeName = this.isQueryMatchingTypeName.bind(this);
    this.hashChangeHandler = this.hashChangeHandler.bind(this);
  }
  hashChangeHandler(event) {
    const url = new URL(event.newURL);
    this.selectTypeName(url.hash.substr(1));
  }
  componentDidMount() {
    window.addEventListener("hashchange", this.hashChangeHandler, false);
    const hash = window.location.hash.substr(1);
    if (hash) {
      this.setState({
        selectedTypeName: hash
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("hashchange", this.hashChangeHandler);
  }
  query(value) {
    this.setState({
      query: value.trim().toLowerCase()
    });
  }
  isQueryMatchingTypeName(typeName) {
    return typeName.toLowerCase().indexOf(this.state.query) !== -1;
  }
  clearQuery() {
    this.setState({
      query: ''
    });
  }
  hasSelectedTypeName() {
    return this.state.selectedTypeName !== null;
  }
  selectTypeName(typeName) {
    this.setState({
      selectedTypeName: typeName
    });
  }
  deselectTypeName() {
    this.setState({
      selectedTypeName: null
    });
  }
  getAstTypes() {
    return Object.keys(namedTypes);
  }
  renderListItem(typeName) {
    const selected = this.state.selectedTypeName === typeName ? 'typeList-item--selected' : '';
    return <li key={typeName} className={`typeList-item ${selected}`}>
      <a className="typeList-anchor" href={`/#${typeName}`}>{typeName}</a>
    </li>;
  }
  renderList() {
    const list = this.getAstTypes().filter(this.isQueryMatchingTypeName)

    if (list.length === 0) {
      return this.renderNoResults();
    }

    return list.map(typeName => this.renderListItem(typeName));
  }
  renderNoResults() {
    return <li className="noresults">No results</li>;
  }
  render() {
    return (
      <main className="appContainer">
        <section className="listContainer">
          <form className="filterForm">
            <input className="filterForm-input" type="search" onInput={(event)=> this.query(event.target.value)} autoFocus/>
          </form>
          <ul className="typeList">
            { this.renderList() }
          </ul>
        </section>
        <section className="detailsContainer">
          { this.hasSelectedTypeName() && <Details typeName={this.state.selectedTypeName}/> }
        </section>
      </main>
    );
  }
}
