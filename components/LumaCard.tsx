import { Task } from "../types/task";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface LumaCardProps {
  tasks: Task[];
  onAddTask: (title: string) => void;
  onDeleteTask: (id: string, index: number) => void;
  onToggleTask: (id: string, index: number) => void;
  onEditTask: (
    id: string,
    title: string,
    index: number
  ) => void;
}

export default function LumaCard({
  tasks,
  onAddTask,
  onDeleteTask,
  onToggleTask,
  onEditTask,
}: LumaCardProps) {
    const {t} = useLanguage()
  return (
    <Card className="w-full max-w-2xl rounded-3xl border border-green-100 bg-white/95 shadow-xl">
      <CardHeader className="text-center space-y-3 pt-10">

        <div className="flex justify-start">
          <span className="text-sm text-slate-400">
            {tasks.filter((task) => !task.completed).length} {t.remaining}
          </span>
          <LanguageSwitcher />
        </div>

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
          ✦
        </div>

        <CardTitle className="text-4xl font-semibold tracking-tight text-green-950">
          {t.title}
        </CardTitle>

        <CardDescription className="text-base text-slate-500">
         {t.subtitle}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-8 pb-10">
        <TaskForm onAddTask={onAddTask} />

        <TaskList
          tasks={tasks}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
        />

        <p className="text-center text-sm text-slate-400">
           {t.footer}
        </p>
      </CardContent>
    </Card>
  );
}