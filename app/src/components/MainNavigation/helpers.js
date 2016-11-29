import React from 'react';
import { AllTodos, CompletedTodos, ActiveTodos } from '../TodoList';

export const filterToComponent = {
  all: <AllTodos />,
  active: <ActiveTodos />,
  completed: <CompletedTodos />,
};
