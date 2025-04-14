import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleComplete, startEdit, deleteTodo, editingId }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead className="w-[150px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-muted-foreground">
                No todos yet. Add one above!
              </TableCell>
            </TableRow>
          ) : (
            todos.map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                toggleComplete={toggleComplete} 
                startEdit={startEdit} 
                deleteTodo={deleteTodo} 
                editingId={editingId} 
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;