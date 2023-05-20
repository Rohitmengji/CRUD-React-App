import React, { Component } from "react";

export class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
    }
    
    incrementCount = () => {
      this.setState(prevCount => {
        return {
            count : prevCount.count + 1
          }
        })
    }
    decrementCount = () => {
      this.setState(prevCount => {
        return {
            count : prevCount.count -1
          }
        })
    }
  render() {
    return (
      <div>
            <h1>Counter : {this.state.count}</h1>
            <button onClick={this.incrementCount}>Add Count</button>
            <button onClick={this.decrementCount}> decrement Count</button>
      </div>
    );
  }
}

export default Counter;
