import React, { FormEvent, useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../../context/ToDoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, inputFocus } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleCreateNew = () => {
    dispatch({
      type: 'createNew',
      newTodo: {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      }
    });
    setTitle('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!title) {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreateNew();
    }
  };

  // Set inputFocus to false when the input field is focused
  const handleInputFocus = () => {
    dispatch({ type: 'inputFocusTrue' });
  };

  // Set inputFocus to false when the input field is focused
  const handleInputBlur = () => {
    dispatch({ type: 'inputFocusFalse' });
  };

  const handlePreventSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleToggle = () => {
    dispatch({type: 'toggleStatus'});
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames(
            "todoapp__toggle-all",
            {'active': todos.every(plan => plan.completed)},
          )}
          onClick={handleToggle}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handlePreventSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleValue}
          onKeyDown={handleKeyPress}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur} // Add onBlur event handler
          autoFocus={inputFocus}
        />
      </form>
    </header>
  );
};