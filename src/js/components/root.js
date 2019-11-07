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
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.state = {value: ''}
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
 }


  componentDidMount() {
    let body = document.getElementsByTagName('body')[0]
    body.classList.add("bg-black")
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      console.log("keysent")
      api.soto("ret")
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div style={{height: "100vh", cursor: "text"}}>
        <HeaderBar/>
        <Route exact path="/~soto" render={ () => {
          return (
            <div className="pa3 flex flex-column-reverse bg-black mono gray3 w-100"
            style={{lineHeight: "1.4", height: "calc(100% - 48px)"}}>
              <div className="flex flex-row">~{ship}:dojo
              <input autoCorrect="false" autoFocus={true} className="mono ml1 flex-auto dib w-100" onKeyDown={this.keyPress}></input>
              </div>
            </div>
          )}}
        />
        </div>
      </BrowserRouter>
    )
  }
}

