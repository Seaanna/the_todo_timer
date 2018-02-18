import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import TodoList from './components/TodoList'
import Timer from './components/Timer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Container fluid={true}>
          <br/>
          <h1 className='text-center'>The Todo Timer</h1>
          <br/>
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
      </MuiThemeProvider>
    );
  }
}

export default App;
