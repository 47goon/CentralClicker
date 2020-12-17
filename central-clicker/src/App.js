import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { web3, NETWORK_TYPE, defaultAccount, pointContract, itemContract } from "./config";
import './App.css';
const Tx = require('ethereumjs-tx').Transaction

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_manual_clicks: 0,
      per_click: 1,
      items: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.getUserPoints = this.getUserPoints.bind(this)
    this.requestItem = this.requestItem.bind(this)

    pointContract.methods.getTotalPoints().call().then((points) => {
      this.setState(state => ({user_manual_clicks: points}));
    })
  }

  getUserPoints() {
    pointContract.methods.getTotalPoints().call().then((points) => {
      return points
    })
  }

  tick() {
    //this.setState(state => ({user_manual_clicks: parseInt(this.state.user_manual_clicks, 10) + 2}));
  }

  componentDidMount() {
    document.title = "Central Clicker!";
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  requestItem(point_amount, price){
    if (price > this.getUserPoints()) {return;}

    pointContract.methods.removePoints(price).send({from: '0xf3190f8E82dcd76b00956941DF77FaB921537131'}).then(() => {
      
      pointContract.methods.getTotalPoints().call().then((points) => {
        this.setState(state => ({user_manual_clicks: points}));
      })
      
      this.setState(state => ({per_click: this.state.per_click + point_amount}));
      console.log(this.state.per_click)
    })

    itemContract.methods.createItem(10, 10).send({from: '0xf3190f8E82dcd76b00956941DF77FaB921537131'}).then((id) => {
      console.log(id)
    })
    
  }

  doClick(point_amount){
    if (point_amount < 0) {return;}
    pointContract.methods.pushPoints(point_amount).send({from: '0xf3190f8E82dcd76b00956941DF77FaB921537131'}).then(() => {
      pointContract.methods.getTotalPoints().call().then((points) => {
        this.setState(state => ({user_manual_clicks: points}));
      })
    }) 
  }

  handleClick() {
    this.doClick(this.state.per_click)
  }

  render() {
    return (
      <div className="App">
        <i className="header-text">Central Clicker</i>
        <Button className="central_button" onClick={this.handleClick}> 
          <img 
            src="https://www.pngkit.com/png/full/40-405769_quick-links-c-logo-for-gaming.png"
            className = "photo"
            alt="new"
          />
        </Button>
          <br></br>
        <i className="largeText-green">$</i><i className="largeText">{this.state.user_manual_clicks}</i>
        <br></br>
        <i className="click-text">Per click: ${this.state.per_click}</i>
        <div id="onebox">
            <button onClick={() => this.requestItem(2, 10)}>Buy +2 ($10)</button>
            <button onClick={() => this.requestItem(5, 20)}>Buy +5 ($20)</button>
            <button onClick={() => this.requestItem(10, 45)}>Buy +10 ($45)</button>
            <button onClick={() => this.requestItem(15, 75)}>Buy +15 ($75)</button>
            <button onClick={() => this.requestItem(30, 100)}>Buy +30 ($100)</button>
        </div>
      <br></br>
        <div id="onebox">
            <button>Buy +2i ($100)</button>
            <button>Buy +5i ($300)</button>
            <button>Buy +10i ($500)</button>
            <button>Buy +15i ($800)</button>
            <button>Buy +30i ($1000)</button>
        </div>
        <div id="onebox">
            <button>View Items</button>
            <button>Trade Items</button>
        </div>
      </div>
    );
  }

}
export default App;
