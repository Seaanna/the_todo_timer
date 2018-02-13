import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import TodoList from './components/TodoList'

class App extends Component {
  render() {
    return (
      <div>
        <Container fluid={true}>
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
                Timer
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
