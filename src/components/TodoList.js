import React, { Component } from 'react';
import { Button } from 'reactstrap';
import TextField from 'material-ui/TextField';

class TodoList extends Component {
  render() {
    return (
      <div>
        <h1 className='text-center'>Todo List</h1>
        <TextField
          floatingLabelText="Add New Todo"
        />
        <Button color="success">Create</Button>
      </div>
    );
  }
}

export default TodoList;
