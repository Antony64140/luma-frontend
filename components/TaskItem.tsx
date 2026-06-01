import { useState } from "react";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
}

export default function TaskItem({
  task,
  onDeleteTask,
  onToggleTask,
  onEditTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  function handleEdit() {
    onEditTask(task._id, editTitle);

    setIsEditing(false);
    setEditTitle("");
  }

  return (
    <div>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
        >
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <button type="submit">
            Valider
          </button>

          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditTitle("");
            }}
          >
            Annuler
          </button>
        </form>
      ) : (
        <p
          style={{
            textDecoration: task.completed
              ? "line-through"
              : "none",
          }}
        >
          {task.title}
        </p>
      )}

      <button onClick={() => onToggleTask(task._id)}>
        {task.completed ? "✓" : "Terminer"}
      </button>

      <button
        onClick={() => {
          setIsEditing(true);
          setEditTitle(task.title);
        }}
      >
        Modifier
      </button>

      <button onClick={() => onDeleteTask(task._id)}>
        Supprimer
      </button>
    </div>
  );
}