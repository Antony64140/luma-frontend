import { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
}

export default function TaskList({
  tasks,
  onDeleteTask,
  onToggleTask,
  onEditTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-sm text-slate-400">
        Aucune tâche pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}