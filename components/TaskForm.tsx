"use client";

import { useState } from "react";
//les props que TaskForm doit recevoir
interface TaskFormProps {
  onAddTask: (title: string) => void;}

export default function TaskForm({
  onAddTask,}: TaskFormProps) {
  const [title, setTitle] = useState("");
  function handleSubmit() {
  const trimmedTitle = title.trim();
   if (trimmedTitle.length < 1) {
    return;}
  if (trimmedTitle.length > 50) {
    return; }
  onAddTask(trimmedTitle);
    setTitle(""); }
  return (
    <div>
      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={50}/>
      <button onClick={handleSubmit}>
        Ajouter
      </button>
    </div>
  );
}