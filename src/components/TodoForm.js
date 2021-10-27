import React, { useState, useEffect, useRef } from 'react';
import { serverTimestamp } from 'firebase/firestore';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      title: input,
      createdAt: serverTimestamp(),
      isCompleted: false,
    });
    setInput('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="todo-form">
        {props.edit ? (
          <>
            <input
              type="text"
              placeholder="Edit a todo item"
              value={input}
              name="title"
              className="todo-input edit"
              onChange={handleChange}
              ref={inputRef}
            />
            <button onSubmit={handleSubmit} className="todo-button">
              Update
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Add a todo item"
              value={input}
              name="title"
              className="todo-input"
              onChange={handleChange}
              ref={inputRef}
            />
            <button onSubmit={handleSubmit} className="todo-button">
              Add todo
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default TodoForm;
