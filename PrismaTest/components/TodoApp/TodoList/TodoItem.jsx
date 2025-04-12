import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash2 } from "lucide-react";

const TodoItem = ({ todo, onToggleComplete, onEdit, onDelete, isEditing, editText, setEditText, saveEdit }) => {
  return (
    <tr className={todo.completed ? "bg-muted/50" : ""}>
      <td className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            autoFocus
          />
        ) : (
          todo.text
        )}
      </td>
      <td className="text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleComplete}
            className="h-8 w-8"
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Mark as {todo.completed ? "incomplete" : "complete"}</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onEdit}
            disabled={isEditing}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TodoItem;