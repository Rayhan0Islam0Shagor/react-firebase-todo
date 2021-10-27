import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

import TodoForm from './TodoForm';
import Todo from './Todo';
import Modal from 'react-modal';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // collection reference
  const tasksCollectionRef = collection(db, 'tasks');

  useEffect(() => {
    const getTodo = async () => {
      const data = await getDocs(tasksCollectionRef);

      const todo = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setTodos(todo);
    };

    getTodo();
  }, [tasksCollectionRef]);

  const addTodo = async (todo) => {
    const newTodo = [todo, ...todos];

    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    if (newTodo.length !== 0) {
      var i = 1;
      while (i < newTodo.length) {
        if (newTodo[i].title === todo.title) {
          setModalIsOpen(true);
        }
        i++;
      }
    }

    await addDoc(tasksCollectionRef, todo);

    swal({
      title: 'Good job!',
      text: 'Task Added, PLease reload for check new task',
      icon: 'success',
      button: 'Okay',
    });
  };

  const updateTodo = async (id, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }

    const taskDoc = await doc(db, 'tasks', id);

    await updateDoc(taskDoc, {
      newValue,
    });

    swal({
      title: 'task Updated',
      text: 'PLease reload for seeing change',
      icon: 'success',
      button: 'Okay',
    });
  };

  const removeTodo = async (id) => {
    const dltDoc = await doc(db, 'tasks', id);

    await deleteDoc(dltDoc);

    swal({
      title: 'Task Deleted',
      text: 'PLease reload for new update',
      icon: 'success',
      button: 'Okay',
    });
  };

  const completeTodo = async (id) => {
    const findDoc = await doc(db, 'tasks', id);

    await updateDoc(findDoc, { isCompleted: true });

    swal({
      title: 'task completed',
      text: 'PLease reload for new update',
      icon: 'success',
      button: 'Okay',
    });
  };

  return (
    <div>
      <h1>What's the task for Today?</h1>
      <TodoForm onSubmit={addTodo} />

      <div className="list-of-item">
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>

      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h2>Ooops!</h2>
        <p>It's look like you already add this task...</p>
        <button onClick={() => setModalIsOpen(false)}>I Know</button>
      </Modal>
    </div>
  );
}

export default TodoList;
