import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { 
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} from '../api/apiSlice';


const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  //rtk query
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId:1, title:newTodo, completed: false })
    setNewTodo('');
  };

  const newItemSection = (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input type="text"
          id='new-todo'
          value={ newTodo }
          onChange={ (e) => setNewTodo(e.target.value) }
          placeholder='Enter new todo'
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={ faUpload }/>
      </button>
    </form>
  );

  const successContent = (todos) => {
    return (
      todos.map(todo => (
        <article key={todo.id}>
          <div className="todo">
            <input type="checkbox"
              id={todo.id}
              checked={todo.completed}
              onChange={ () => updateTodo({ ...todo, completed: !todo.completed }) }
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className='trash'
            onClick={() => deleteTodo({ id: todo.id })}
          >
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        </article>
      ))
    );
  }

  let content;
  isLoading ? content = <p>Loading...</p>
  : isSuccess ? content = successContent(todos)//JSON.stringify(todos)
  : isError ? content = <p>{error}</p>
  : content = null;

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  )
}

export default TodoList