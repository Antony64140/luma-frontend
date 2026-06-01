"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}
export default function TaskForm({
  onAddTask,
}: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 1) {
      return;}
    if (trimmedTitle.length > 50) {
      return;}
    onAddTask(trimmedTitle);
    setTitle("");}

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 rounded-2xl border border-green-100 bg-white p-3 shadow-sm"
    >
      <Input
        type="text"
        placeholder="Quelle est ta prochaine tâche ?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={50}
        className="border-0 bg-transparent shadow-none focus-visible:ring-0"
      />

      <Button
        type="submit"
        className="bg-green-700 text-white hover:bg-green-800"
      >
        Ajouter
      </Button>
    </form>
  );
}