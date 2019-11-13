import React, { Component } from 'react'
import { store, buffer } from '../store'
import { api } from '../api';

export class Input extends Component {
    constructor(props) {
        super(props);
        this.keyPress = this.keyPress.bind(this);
    }

    keyPress = (e) => {
      let ignoredKeys = ["Meta", "Alt", "Control", "Escape", "Shift",
                        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8",
                        "F9", "F10", "F11", "F12"
                        ]
      // submit on enter
        if (e.keyCode === 13 || e.key === "Enter") {
          api.soto("ret")
        }
        // remove and resubmit console input if anything is inputted
          // XX backspace behaviour is fucking weird, look into this
        else if (e.key === "Backspace") {
          if (this.props.cursor > 0) {
            return store.doEdit({ del: this.props.cursor - 1 });
          } else {
            e.preventDefault();
          }
        }
        else if (e.key.startsWith("Arrow")) {
          if (e.key === "ArrowLeft") {
            (this.props.cursor > 0) ? 
            store.setState({cursor: this.props.cursor - 1}) : 
            e.preventDefault();
          }
          else if (e.key === "ArrowRight") {
            (this.props.cursor <= this.props.input.length) ?
            store.setState({ cursor: this.props.cursor + 1}) :
            e.preventDefault();
          }
          else e.preventDefault(); // XX up/down should browse command history
        }
        // tab completion
        else if (e.key === "Tab") {
          e.preventDefault();
          api.soto({tab: this.props.cursor});
        }
        // capture and transmit most characters
        else if (ignoredKeys.indexOf(e.key) === -1) {
          let thisact = buffer.transmit({ins:{at: this.props.cursor, cha: e.key}});
          api.soto({det: thisact});
          }
      }

      handleChange = (e) => {
        store.setState({ input: event.target.value });
        store.setState({ cursor: event.target.selectionEnd });
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
