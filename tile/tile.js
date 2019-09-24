import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';


export default class sotoTile extends Component {

  render() {
    return (
      <div className="w-100 h-100 relative bg-black ba b--gray" style={{ }}>
        <a className="pa2 no-underline b label-regular absolute" href="/~soto"
        style={{ right: 8, top: 4, color: "#777", padding: 0 }}>Dojo -></a>
        <section class="eval mono gray flex pt4 pl1 pr1"
        style={{fontFamily: `"Source Code Pro", monospace`, lineHeight: "1.4"}}>~{window.ship}:eval>
        <input autoFocus class="dib flex-auto bg-black gray bn ml1"
        style={{fontFamily: `"Source Code Pro", monospace`}}></input>
        </section>
      </div>
    );
  }

}

window.sotoTile = sotoTile;
