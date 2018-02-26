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
  }

}

class App extends Component {
  state = {
    settingsOpen: false,
  };

  handleOpen = () => {
    this.setState({settingsOpen: true});
  };

  handleClose = () => {
    this.setState({settingsOpen: false});
  };

  render() {
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
                <Timer />
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
            These are your settings!
          </div>
          <Row>
            <Col xs={12}>
              <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleClose}
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
