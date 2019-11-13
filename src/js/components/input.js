import React, { Component } from 'react'
import { store, buffer } from '../store'
import { api } from '../api';

export class Input extends Component {
    constructor(props) {
        super(props);
        this.keyPress = this.keyPress.bind(this);
    }
    // needs to overrule copy/pastes
    keyPress = (e) => {
        if (e.keyCode === 13) {
          console.log(e.key)
          api.soto("ret")
        }
        else if ((e.key === "Backspace") && (this.props.cursor > 0)) {
          return store.doEdit({del: this.props.cursor - 1})
        }
        else if (e.key === "Backspace") {
          e.preventDefault();
        }
        else if (e.key === "Tab") {
          e.preventDefault();
          api.soto("tab");
        }
        else if (!(e.key === "Meta" 
                || e.key === "Alt" 
                || e.key === "Control" 
                || e.key === "Escape" 
                || e.key === "Shift")) {
          let thisact = buffer.transmit({ins:{at: this.props.cursor, cha: e.key}});
          api.soto({det: thisact});
          }
      }

      handleChange = (e) => {
        store.setState({ input: event.target.value });
        store.setState({ cursor: event.target.selectionEnd });
        console.log(this.props.cursor);
      }

    render() {
        return (
          <div className="flex flex-row" 
          style={{ flexGrow: 1 }}>
            ~{this.props.ship}:dojo
          <span id="prompt">
            {this.props.prompt}
          </span>
              <input 
              autoCorrect="false" 
              autoFocus={true}
              className="mono ml1 flex-auto dib w-100"
              onChange={this.handleChange}
              onKeyDown={this.keyPress}
              onPaste={e => {e.preventDefault()}}
              value={this.props.input}/>
            </div>
        )
    }
}

export default Input
