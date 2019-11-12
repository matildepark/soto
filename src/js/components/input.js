import React, { Component } from 'react'
import { store, buffer } from '../store'

export class Input extends Component {
    constructor(props) {
        super(props);
        this.keyPress = this.keyPress.bind(this);
    }

    keyPress(e) {
        if (e.keyCode === 13) {
          console.log(e.key)
          api.soto("ret")
        }
        else if (e.key === "Backspace") {
          // i'll come to you
          e.preventDefault();
        }
        else if (!(e.key === "Meta" || e.key === "Alt" || e.key === "Control" || e.key === "Escape" || e.key === "Shift")) {
          let thisact = buffer.transmit({ins:{at: store.state.cursor, cha: e.key}});
          api.soto({det: thisact});
          }
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
              onChange={event => {
                store.setState({cursor: event.target.selectionStart})
                buffer.buf = event.target.value
              }}
              onKeyDown={this.keyPress}>
              </input>                
            </div>
        )
    }
}

export default Input
