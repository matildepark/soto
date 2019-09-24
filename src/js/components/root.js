import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import classnames from 'classnames'
import _ from 'lodash'
import { HeaderBar } from "./lib/header-bar.js"
import { api } from '../api'


export class Root extends Component {
  constructor(props) {
    super(props);
    let ship = window.ship;
  }

  componentDidMount() {
    let body = document.getElementsByTagName('body')[0]
    body.classList.add("bg-black")
  }

  sotoAction() {
    api.soto("hi")
  }

  render() {

    return (
      <BrowserRouter>
        <div>
        <HeaderBar/>
        <Route exact path="/~soto" render={ () => {
          return (
            <div className="pa3 flex bg-black mono gray2 w-100"
            style={{lineHeight: "1.4"}}>~{ship}:dojo>
              <input autoCorrect="false" autoFocus={true} className="mono ml1 flex-auto dib w-100"></input>
            </div>
          )}}
        />
        </div>
      </BrowserRouter>
    )
  }
}

