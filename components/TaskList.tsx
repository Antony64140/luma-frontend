import { useState } from "react";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
}

export default function TaskList({
  tasks,
  onDeleteTask,
  onToggleTask,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
          {editingId === task._id ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)} /> 
            ) : (
            <p
              style={{
                textDecoration: task.completed
                  ? "line-through" : "none", }} >{task.title}
            </p>
          )}
          <button onClick={() => onToggleTask(task._id)}>
            {task.completed ? "✓" : "Terminer"}
          </button>
          <button
            onClick={() => {
              setEditingId(task._id);
              setEditTitle(task.title); }}>
            Modifier
          </button>
          <button onClick={() => onDeleteTask(task._id)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}