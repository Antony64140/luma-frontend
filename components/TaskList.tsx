import { Task } from "../types/task";
import TaskItem from "./TaskItem";
import { useLanguage } from "@/context/LanguageContext";
interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string, index: number) => void;
  onToggleTask: (id: string, index: number) => void;
  onEditTask: (
    id: string,
    title: string,
    index: number
  ) => void;
}

export default function TaskList({
  tasks,
  onDeleteTask,
  onToggleTask,
  onEditTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    const { t } = useLanguage();
    return (
      <p className="text-center text-sm text-slate-400">
        {t.empty}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <TaskItem
          key={task._id}
          task={task}
          index={index}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}