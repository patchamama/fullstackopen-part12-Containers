import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Todo from './Todo'

describe('Todo Component', () => {
  const todo = {
    id: 1,
    text: 'Sample Todo',
    done: false,
  }

  const deleteTodo = jest.fn()
  const completeTodo = jest.fn()

  test('renders todo correctly', () => {
    render(
      <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    )

    expect(screen.getByText('Sample Todo')).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  })

  test('displays "This todo is done" when todo is done', () => {
    const doneTodo = { ...todo, done: true }
    render(
      <Todo
        todo={doneTodo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />
    )
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
  })

  test('displays "This todo is not done" when todo is not done', () => {
    render(
      <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    )
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  })
})
