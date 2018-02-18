import React, { Component } from 'react';
import { Button } from 'reactstrap';
import TextField from 'material-ui/TextField';

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
        <p key={todo.name}>{todo.name}</p>
      ))
    );
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>Todo List</h1>
        <br/>
        {
          this.renderTodos(this.state.todos)
        }
        <br/>
        <TextField
          floatingLabelText="Add New Todo"
          value={this.state.newTodo.name}
          onChange={this.handleInput.bind(this)}
        />
        <Button 
          color="success"
          onClick={this.addTodo.bind(this)}
        >
          Create
        </Button>
      </div>
    );
  }
}

export default TodoList;
