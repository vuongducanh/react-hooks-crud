import React, { useReducer, useState, useEffect } from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case 'DO_ALL':
      return state.map(todo => {
        return { ...todo, complete: true };
      })
    default:
      return state;
  }
};

const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: false,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: false,
  },
];

const initialTodosUseState = [
  {
    id: 'd',
    task: 'ahihi',
    complete: false,
  },
  {
    id: 'y',
    task: 'kakak',
    complete: false,
  },
];


function TestReduce() {
  const [todos, dispatch] = useReducer(
    todoReducer,
    initialTodos
  );

  const [todosUseState, setTodo] = useState(initialTodosUseState)

  const handleChange = todo => {
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };

  const handleChangeSetState = todo => {
    let index = todosUseState.findIndex((el) => el.id === todo.id);
    if (todo.complete) {
      todosUseState[index].complete = false;
    } else {
      todosUseState[index].complete = true;
    }
    setTodo([...todosUseState])
  }

  const handleCheckAll = () => {
    dispatch({
      type: 'DO_ALL',
    });
    setTodo(todosUseState.map(todo => {
      return { ...todo, complete: true };
    }))
  }

  useEffect(() => {
    console.log('components test-reduce')
  },[])


  return (
    <div className="test-reduce">
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChange(todo)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
      <br></br>
      <br></br>
      <button onClick={handleCheckAll}>Check all</button>
      <ul>
        {todosUseState.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeSetState(todo)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestReduce;
