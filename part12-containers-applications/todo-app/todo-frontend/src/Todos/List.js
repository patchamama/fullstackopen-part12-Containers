import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map((todo) => {
          return (
            <>
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
              <hr />
            </>
          )
        })
        .reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
