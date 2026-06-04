import { useState, memo } from "react";
import { Task } from "../types/task";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  task: Task;
  index : number
  onDeleteTask: (id: string, index : number) => void;
  onToggleTask: (id: string, inex : number) => void;
  onEditTask: (id: string, title: string, index : number) => void;
}

 function TaskItem({
  task,
  index,
  onDeleteTask,
  onToggleTask,
  onEditTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  function handleEdit() {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle.length < 1) {
      return; }
    if (trimmedTitle.length > 50) {
      return;}
    onEditTask(task._id, trimmedTitle, index);
    setIsEditing(false);
    setEditTitle("");}
const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-sm font-medium text-green-700">
  {String(index + 1).padStart(2, "0")}
</div>
      <Button
        type="button"
        onClick={() => onToggleTask(task._id, index)}
        variant={task.completed ? "outline" : "default"}
        className={
          task.completed
            ? "h-9 w-9 border-green-200 bg-green-50 p-0 text-green-700 hover:bg-green-100"
            : "bg-green-700 text-white hover:bg-green-800 cursor-pointer"}>
        {task.completed ? "✓" : t.complete}
      </Button>
      <div className="flex-1">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(); }}
            className="flex gap-2" >
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              maxLength={50}
              autoFocus
              className="h-9"/>
            <Button  type="submit"  size="sm"  className="bg-green-700 text-white hover:bg-green-800 cursor-pointer">
              {t.validate}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="cursor-pointer"
              onClick={() => {
                setIsEditing(false);
                setEditTitle("");}} >
              {t.cancel}
            </Button>
          </form>) : (
          <p
            className={
              task.completed
                ? "text-sm text-slate-400 line-through"
                : "text-sm text-slate-800"}>
            {task.title}
          </p>)}
      </div>
      {!isEditing && (
        <div className="flex gap-2">
          <Button  type="button"   variant="ghost"    size="sm"  className="cursor-pointer"
            onClick={() => {
              setIsEditing(true);
              setEditTitle(task.title);}}>
            {t.edit}
          </Button>
          <Button type="button" variant="ghost" size="sm"
            onClick={() => onDeleteTask(task._id , index)}
            className="text-red-400 hover:text-red-600 cursor-pointer">
            {t.delete}
          </Button>
        </div>)}
    </div> );}
    export default memo(TaskItem);