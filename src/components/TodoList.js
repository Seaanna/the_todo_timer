import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Paper from 'material-ui/Paper';
import TextField from './TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const styles = {
  todoList: {
    height: 400,
    textAlign: "left",
    overflow: "scroll"
  },
  textField: {
    marginRight: 10,
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: {name: ''}
    };
  }

  addTodo() {
    let todos = this.state.todos;

    if(this.state.newTodo && this.state.newTodo.name) {
      todos.push(this.state.newTodo)
      this.setState({todos: todos, newTodo: {name: ''}});
    }
  }

  handleInput(event, value){
    this.setState({newTodo: {name: value}})
  }

  renderTodos(todos) {
    return(
      todos.map((todo, index) => (
        <ListGroupItem key={todo.name}>{todo.name}</ListGroupItem>
      ))
    );
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>Todo List</h1>
        <br/>
        <Row>
          <Col xs={{ size: 8, offset: 2 }}>
            <div style={styles.todoList}>
            <ListGroup>
             {this.renderTodos(this.state.todos)}
            </ListGroup>
            </div>
            <br/>
            <Row>
              <Col xs={10}>
                <TextField
                  style={styles.textField}
                  fullWidth={true}
                  floatingLabelText="Add New Todo"
                  value={this.state.newTodo.name}
                  onChange={this.handleInput.bind(this)}
                />
              </Col>
              <Col xs={2}>
                <FloatingActionButton onClick={this.addTodo.bind(this)} backgroundColor="#1e88e5">
                  <ContentAdd />
                </FloatingActionButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TodoList;
