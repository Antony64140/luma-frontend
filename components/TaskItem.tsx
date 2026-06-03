import { useState, memo } from "react";
import { Task } from "../types/task";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  task: Task;
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
}

 function TaskItem({
  task,
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
    onEditTask(task._id, trimmedTitle);
    setIsEditing(false);
    setEditTitle("");}

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <Button
        type="button"
        onClick={() => onToggleTask(task._id)}
        variant={task.completed ? "outline" : "default"}
        className={
          task.completed
            ? "h-9 w-9 border-green-200 bg-green-50 p-0 text-green-700 hover:bg-green-100"
            : "bg-green-700 text-white hover:bg-green-800"}>
        {task.completed ? "✓" : "Terminé"}
      </Button>
      <div className="flex-1">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(); }}
            className="flex gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              maxLength={50}
              autoFocus
              className="h-9"/>
            <Button  type="submit"  size="sm"  className="bg-green-700 text-white hover:bg-green-800">
              Valider
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                setEditTitle("");}} >
              Annuler
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
          <Button  type="button"   variant="ghost"    size="sm"
            onClick={() => {
              setIsEditing(true);
              setEditTitle(task.title);}}>
            Modifier
          </Button>
          <Button type="button" variant="ghost" size="sm"
            onClick={() => onDeleteTask(task._id)}
            className="text-red-400 hover:text-red-600">
            Supprimer
          </Button>
        </div>)}
    </div> );}
    export default memo(TaskItem);