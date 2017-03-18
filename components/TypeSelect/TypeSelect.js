import React from 'react';

export default class TypeSelect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayName: props.children,
        listVisible: false
      }
      this.clickHandler = this.clickHandler.bind(this);
      this.clickListItemHandler = this.clickListItemHandler.bind(this);
    }

    clickListItemHandler(event, typeName) {
      event.stopPropagation();
      this.hideList();
      this.setState({
        displayName: typeName
      });
    }

    clickHandler(event) {
      event.preventDefault();
      this.showList();
    }

    showList() {
      this.setState({
        listVisible: true
      });
    }

    hideList() {
      this.setState({
        listVisible: false
      });
    }

    renderList() {
      if (!this.state.listVisible) {
        return null;
      }
      const { displayName } = this.state;
      const typeDescendants = this.props.typeDescendants;
      const options = [displayName, ...typeDescendants.filter(typeName => typeName !== displayName)];

      return <ul className="typeSelect-list">{
        options.map(option => {
          return <li key={option} className="typeSelect-listItem" onClick={(event) => this.clickListItemHandler(event, option)}>{option}</li>;
        })
      }</ul>
    }

    render() {
      const { displayName } = this.state;
      return <span className="typeSelect" onClick={this.clickHandler}>{
        displayName
      }{this.renderList()}</span>;
    }
}
