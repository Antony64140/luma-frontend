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
  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
            <p
            style={{
              textDecoration: task.completed
                ? "line-through"
                : "none",}}>
            {task.title}
          </p>
          <button onClick={() => onToggleTask(task._id)}>
            {task.completed ? "✓" : "Terminer"}
          </button>
          <button onClick={() => onDeleteTask(task._id)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}