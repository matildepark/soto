import React, { Component } from 'react'

export class Input extends Component {
    constructor(props) {
        super(props);
        this.keyPress = this.keyPress.bind(this);
    }

    keyPress(e) {
        if (e.keyCode === 13) {
          console.log("keysent")
          api.soto("ret")
        }
      }

    render() {
        return (
            <div className="flex flex-row">~{this.props.ship}:dojo<span id="prompt"></span>
              <input autoCorrect="false" autoFocus={true} className="mono ml1 flex-auto dib w-100" onKeyDown={this.keyPress}></input>                
            </div>
        )
    }
}

export default Input
