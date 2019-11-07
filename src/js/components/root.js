import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import classnames from 'classnames'
import _ from 'lodash'
import { HeaderBar } from './lib/header-bar'
import { History } from './history'
import { Input } from './input'
import { api } from '../api'


export class Root extends Component {
  constructor(props) {
    super(props);
    let ship = window.ship;
  }


  componentDidMount() {
  //
  }

  render() {
    return (
      <BrowserRouter>
        <div style={{height: "100vh"}}>
        <HeaderBar/>
        <Route exact path="/~soto" render={ () => {
          return (
            <div className="pa3 flex flex-column-reverse bg-black mono gray3 w-100"
            style={{lineHeight: "1.4", height: "calc(100% - 48px)", cursor: "text"}}>
              <History/>
              <Input ship={ship}/>
            </div>
          )}}
        />
        </div>
      </BrowserRouter>
    )
  }
}

