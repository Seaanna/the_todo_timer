import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Timer extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 20 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }
// componentDidMount() is invoked immediately after a component is mounted.
// Initialization that requires DOM nodes should go here.
// If you need to load data from a remote endpoint,
// this is a good place to instantiate the network request.
  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return(
      <div>
      <h1 className='text-center'>Timer</h1>
      <br/>
      <br/>
        m: {this.state.time.m} s: {this.state.time.s}
        <br/>
        <br/>
        <Button color="primary" onClick={this.startTimer}>Start</Button>
        <Button color="warning">Pause</Button>
      </div>
    );
  }
}


export default Timer;
