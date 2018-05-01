import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import TodoList from './components/TodoList'
import Timer from './components/Timer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Settings from 'material-ui-icons/Settings';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from './components/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui-icons/Delete';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const font = "'Open Sans', sans-serif";
const muiTheme = getMuiTheme({
  fontFamily: font
});

const styles = {
  heading: {
    paddingTop: 25,
    paddingBottom: 15,
    backgroundColor: '#eeeeee',
    marginBottom: 25
  },
  icon: {
    width: 30,
    height: 30,
    position: 'relative',
    cursor: 'pointer'
  },
  dialogHeight: {
    marginTop: 25,
    minHeight: 350
  },
  textField: {
    marginRight: 10,
    fontSize: 20
  },
  inline: {
    display: 'inline-block'
  },
  delete: {
    width: 35,
    height: 35,
    position: 'relative',
    top: 30,
    left: 10,
    cursor: 'pointer'
  }
}

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      settingsOpen: false,
      cycles: [25, 5],
      cyclesCopy: [25, 5],
      newCycle: ''
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewCycleInput = this.handleNewCycleInput.bind(this);
  }

  handleOpen() {
    this.setState({settingsOpen: true});
  };

  handleClose() {
    let cycles = JSON.parse(JSON.stringify(this.state.cycles));
    this.setState({settingsOpen: false, cyclesCopy: cycles});
  };

  handleSubmit() {
    let cycles = JSON.parse(JSON.stringify(this.state.cyclesCopy));
    this.setState({cycles: cycles, settingsOpen: false})
  }

  handleInput(index, event, value){
    let cycles = this.state.cyclesCopy;
    cycles[index] = value;
    this.setState({cyclesCopy: cycles})
  }

  handleNewCycleInput(event, value) {
    this.setState({newCycle: value});
  }

  addCycle() {
    let cycles = this.state.cyclesCopy;

    if(this.state.newCycle) {
      cycles.push(this.state.newCycle)
      this.setState({cyclesCopy: cycles, newCycle: ''})
    }
  }

  removeCycle(index) {
    let cycles = this.state.cyclesCopy;

    cycles.splice(index, 1);
    this.setState({cyclesCopy: cycles})
  }

  renderCycleInputs(cycles) {
    let cycleInputs = [];
    const cyclesCount = cycles.length;

    for (let index in cycles) {
      const cycle = cycles[index];
      cycleInputs.push(
        <Row>
          <Col xs={10}>
            <TextField
              type='number'
              style={styles.textField}
              fullWidth={true}
              floatingLabelText={'Cycle Minutes ' + (parseInt(index)+1)}
              value={cycle}
              onChange={this.handleInput.bind(this, index)}
            />
          </Col>
          <Col xs={2}>
            {
              cyclesCount != 1 &&
              <span
                style={styles.inline}
                onClick={this.removeCycle.bind(this, index)}
              >
                <Delete style={styles.delete} color='grey' />
              </span>
            }
          </Col>
        </Row>
      );
    }

    return cycleInputs
  }

  render() {
    const cycles = JSON.parse(JSON.stringify(this.state.cycles));
    const newCycleIndex = this.state.cyclesCopy.length + 1;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Container fluid={true} className='lato'>
          <Row style={styles.heading}>
            <Col sm={{ size: 10, offset: 1 }}>
              <h1 className='digital'>
              The Todo Timer
              <span className='float-right'>
                <Settings style={styles.icon} onClick={this.handleOpen} color='black' />
              </span>
              </h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <div className='text-center'>
                <TodoList />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className='text-center'>
                <Timer cycles={cycles} />
              </div>
            </Col>
          </Row>
        </Container>
        <Dialog
          modal={false}
          open={this.state.settingsOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent='true'
        >
          <h2>Cycles</h2>
          <div style={styles.dialogHeight}>
            {this.renderCycleInputs(this.state.cyclesCopy)}
            <Row style={{marginTop: 30, marginBottom: 40}}>
              <Col xs={10}>
                <TextField
                  type='number'
                  style={styles.textField}
                  fullWidth={true}
                  floatingLabelText={'Cycle Minutes ' + parseInt(newCycleIndex)}
                  value={this.state.newCycle}
                  onChange={this.handleNewCycleInput}
                />
              </Col>
              <Col xs={2}>
                <FloatingActionButton onClick={this.addCycle.bind(this)} backgroundColor="#1e88e5">
                  <ContentAdd />
                </FloatingActionButton>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs={12}>
              <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleSubmit}
                className='float-right'
              />
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
                className='float-right'
              />
            </Col>
          </Row>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default App;
