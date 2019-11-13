import React, { Component } from 'react'
import { store, buffer } from '../store'

export class Input extends Component {
    constructor(props) {
        super(props);
        this.keyPress = this.keyPress.bind(this);
    }

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
              value={this.props.input}/>
            </div>
        )
    }
}

export default Input
