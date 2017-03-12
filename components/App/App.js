import React from 'react';
import astTypes from 'ast-types';

import List from '../TypeList';
import Details from '../TypeDetails';

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
  getAstTypes() {
    return Object.keys(namedTypes);
  }
  getFilteredListItems() {
    return this.getAstTypes().filter(this.isQueryMatchingTypeName)
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
            <List items={this.getFilteredListItems()} selected={this.state.selectedTypeName}/>
          </section>
          <section className="app-column">
            { this.hasSelectedTypeName() && <Details typeName={this.state.selectedTypeName}/> }
          </section>
        </div>
      </main>
    );
  }
}
