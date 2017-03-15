import React from 'react';
import astTypes from 'ast-types';

import List from '../TypeList';
import Details from '../TypeDetails';

const { namedTypes, Type } = astTypes;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      selectedType: null
    }
    this.isQueryMatchingTypeName = this.isQueryMatchingTypeName.bind(this);
    this.hashChangeHandler = this.hashChangeHandler.bind(this);
  }
  hashChangeHandler(event) {
    const url = new URL(event.newURL);
    const typeName = url.hash.substr(1);
    const type = this.getTypeByName(typeName);
    this.selectType(type);
  }
  getTypeByName(typeName) {
    return Type.def(typeName);
  }
  componentDidMount() {
    window.addEventListener("hashchange", this.hashChangeHandler, false);
    const hash = window.location.hash.substr(1);
    const typeName = hash;
    const type = this.getTypeByName(typeName);
    if (type) {
      this.setState({
        selectedType: type
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
  hasSelectedType() {
    return this.state.selectedType !== null;
  }
  selectType(type) {
    this.setState({
      selectedType: type
    });
  }
  getAstTypes() {
    return Object.keys(namedTypes);
  }
  getFilteredListItems() {
    return this.getAstTypes().filter(this.isQueryMatchingTypeName)
  }
  getSelectedTypeName() {
      return this.state.selectedType ? this.state.selectedType.typeName : null;
  }
  render() {
    return (
      <main className="app">
        <header className="app-header">
          <img src="assets/logo.svg" alt="ATD" className="logo"/>
          <form className="filterForm">
            <input className="filterForm-input" type="search" placeholder="Type..." onInput={(event)=> this.query(event.target.value)} autoFocus/>
          </form>
        </header>
        <div className="app-columnsContainer">
          <section className="app-column">
            <List items={this.getFilteredListItems()} selected={this.getSelectedTypeName()}/>
          </section>
          <section className="app-column">
            { this.hasSelectedType() && <Details type={this.state.selectedType}/> }
          </section>
        </div>
      </main>
    );
  }
}
