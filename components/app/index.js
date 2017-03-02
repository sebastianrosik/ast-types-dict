import React from 'react';
import astTypes from 'ast-types';
const { namedTypes } = astTypes;

export default class App extends React.Component {
    getAstTypes() {
        return Object.keys(namedTypes);
    }
    renderListItem(typeName) {
        return (
            <h3>{typeName}</h3>
        );
    }
    renderList() {
        return this.getAstTypes().map(typeName => <li key={typeName}>{this.renderLisItem(typeName)}</li>);
    }
    render() {
        return (
            <section>
            <form>
                <input type="search"/>
            </form>
            <ul>{this.renderList()}</ul>
            </section>
        );
    }
}
