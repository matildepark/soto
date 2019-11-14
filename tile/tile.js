import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';


export default class sotoTile extends Component {

  render() {
    return (
      <div className="w-100 h-100 relative bg-black ba b--gray" style={{ }}>
        <a className="pa2 no-underline b label-regular absolute" href="/~soto"
        style={{ left: 8, top: 4, color: "#777", padding: 0 }}>Dojo</a>
      </div>
    );
  }

}

window.sotoTile = sotoTile;
