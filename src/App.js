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
    minHeight: 350
  },
  textField: {
    marginRight: 10,
    fontSize: 18
  },
}

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      settingsOpen: false,
      cycles: [25, 5],
      cyclesCopy: [25, 5]
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  renderCycleInputs(cycles) {
    let cycleInputs = [];

    for (let index in cycles) {
      const cycle = cycles[index];
      cycleInputs.push(
        <TextField
          type='number'
          style={styles.textField}
          fullWidth={true}
          floatingLabelText="Cycle Minutes"
          value={cycle}
          onChange={this.handleInput.bind(this, index)}
        />
      );
    }

    return cycleInputs
  }

  render() {
    const cycles = JSON.parse(JSON.stringify(this.state.cycles));

    return (
      <MuiThemeProvider>
        <Container fluid={true}>
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
          title="Settings"
          modal={false}
          open={this.state.settingsOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent='true'
        >
          <div style={styles.dialogHeight}>
            {this.renderCycleInputs(this.state.cyclesCopy)}
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
