import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PlayArrow from 'material-ui-icons/PlayArrow';
import Stop from 'material-ui-icons/Stop';
import Refresh from 'material-ui-icons/Refresh';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Sound from 'react-sound';
import ding from '../sounds/DING.mp3'


const styles = {
  timer: {
    fontSize: 30,
    marginTop: 100
  }
}

class Timer extends Component {
  constructor(props) {
    super();

    this.state = {
      seconds: this.minutesToSeconds(props.cycles[0]),
      timerInterval: null,
      soundStatus: 'STOPPED',
      cycleIndex: 0
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.handleSongPlaying = this.handleSongPlaying.bind(this)
  }

  secondsToTime(secs){
    const hours = Math.floor(secs / (60 * 60));
    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);
    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);
    const timeString = this.formatNumber(hours) + ':' +
      this.formatNumber(minutes) + ':' + this.formatNumber(seconds);

    return timeString;
  }

  minutesToSeconds(minutes) {
    return( 60 * minutes );
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
    if (this.state.timerInterval === null) {
      this.setState({ timerInterval: setInterval(this.countDown, 1000) });
    }
  }

  stopTimer() {
    clearInterval(this.state.timerInterval);
    this.setState({ timerInterval: null });
  }

  resetTimer() {
    this.stopTimer();
    this.setState({seconds: this.props.cycles[0]});
  }

  formatNumber(number){
    return number > 9 ? "" + number : "0" + number;
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.stopTimer();
      const cycleIndex = this.props.cycles[this.state.cycleIndex+1] ? (this.state.cycleIndex+1) : 0;
      this.setState({
        soundStatus: 'PLAYING',
        cycleIndex: cycleIndex,
        seconds: this.minutesToSeconds(this.props.cycles[cycleIndex])
      });
      const timer = this;
      setTimeout(function(){
        timer.startTimer();
      }, 1000);
    }
  }

  handleSongPlaying() {
    const timer = this;
    setTimeout(function(){
      timer.setState({soundStatus: 'STOPPED'});
    }, 850);
  }

  render() {
    return(
      <div>
        <div className='digital' style={styles.timer}>
          {this.secondsToTime(this.state.seconds)}
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col xs={4}>
            <div className='text-right'>
              <FloatingActionButton onClick={this.startTimer} backgroundColor="#43a047">
                <PlayArrow />
              </FloatingActionButton>
            </div>
          </Col>
          <Col xs={4}>
            <div className='text-center'>
              <FloatingActionButton onClick={this.stopTimer} backgroundColor="#e53935">
                <Stop />
              </FloatingActionButton>
            </div>
          </Col>
          <Col xs={4}>
            <div className='text-left'>
              <FloatingActionButton onClick={this.resetTimer} backgroundColor="#1e88e5">
                <Refresh />
              </FloatingActionButton>
            </div>
          </Col>
        </Row>
        <Sound
          url={ding}
          playStatus={this.state.soundStatus}
          playFromPosition={0}
          onPlaying={this.handleSongPlaying}
        />
      </div>
    );
  }
}


export default Timer;
