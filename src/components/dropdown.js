import React, { Component } from 'react';
import { SplitButton, MenuItem } from 'react-bootstrap';

class CharacterSwitcher extends Component {

  chooseCharacter = (index, evt) => {
    evt.preventDefault();
    this.props.handler(index);
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return (
      <div>
        Error: {this.props.error.message}
      </div>
    );
  }

  render() {

    const { theme, character } = this.props.data;
    const themeClass = theme ? theme.toLowerCase() : 'default';

    const parentContainerStyles = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'table'
    };

    const subContainerStyles = {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'table-cell',
      verticalAlign: 'middle'
    };

    return (
      <div style={parentContainerStyles} >
        <div style={subContainerStyles}>
          <span className={`h1 center-block text-center text-${theme ? themeClass : 'muted'}`} style={{ marginBottom: 25 }}>Choose a character</span>
          <div className="center-block text-center">
            <SplitButton bsSize="large" bsStyle={themeClass} title={`${character || 'None'}`} id="CharacterSwitcher">
              {this.props.data.characters.map((option, index) =>
                 <MenuItem key={index} eventKey={index} onSelect={this.chooseCharacter}>{option.name}</MenuItem>
               )}
              <MenuItem divider />
              <MenuItem eventKey="reset" onSelect={this.chooseCharacter}>None</MenuItem>
            </SplitButton>
          </div>
          {this.props.data.loading ? this.renderLoading() : ''}
          {this.props.data.error ? this.renderError() : ''}
        </div>
      </div>
    );

  }

}

export default CharacterSwitcher;
