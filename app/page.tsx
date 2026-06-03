"use client";

import { useEffect, useState } from "react";
import { Task } from "../types/task";
import { getTasks, createTask, deleteTask, updateTask, editTask,
} from "../services/tasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { Card,CardContent, CardHeader, CardTitle,CardDescription,
} from "@/components/ui/card";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  // GET
  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);}}
    fetchTasks();}, []);

  // POST
  async function handleAddTask(title: string) {
    try {
      const newTask = await createTask(title);
      setTasks((prevTasks) => [
        ...prevTasks,
        newTask, ]);
    } catch (error) {
      console.error(error);}}

  // DELETE
  async function handleDeleteTask(id: string) {
    try {
      await deleteTask(id);
      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task._id !== id));
    } catch (error) {
      console.error(error);}}

  // PUT completed
async function handleToggleTask(id: string) {
  try {
    const updatedTask = await updateTask(id);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task._id === id) {
          return updatedTask;}
        return task; }));
    if (updatedTask.completed) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false); }, 5000); }
  } catch (error) {
    console.error(error);}}
  // EDIT title
  async function handleEditTask(
    id: string,
    title: string
  ) {
    try {
      const updatedTask = await editTask(
        id,
        title);
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task._id === id) {
            return updatedTask;}
          return task;}));
    } catch (error) {
      console.error(error);}}
  return (
  <main className="min-h-screen bg-green-100 flex items-center justify-center p-6">
     {showNotification && (
      <div className="fixed top-5 right-5 bg-white border border-green-200 shadow-xl rounded-2xl px-6 py-4 z-50">
        <p className="font-semibold text-green-700">
          🎉 Félicitations</p>
        <p className="text-sm text-slate-500">
          Vous avez terminé une tâche.
        </p> </div>)}
    <Card className="w-full max-w-2xl rounded-3xl border border-green-100 bg-white/95 shadow-xl">
      <CardHeader className="text-center space-y-3 pt-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
          ✦
        </div>

        <CardTitle className="text-4xl font-semibold tracking-tight text-green-950">
          Luma
        </CardTitle>

        <CardDescription className="text-base text-slate-500">
          Une seule chose à garder en tête.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-8 pb-10">
        <TaskForm onAddTask={handleAddTask} />

        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}
          onEditTask={handleEditTask}
        />

        <p className="text-center text-sm text-slate-400">
          Tu avances. Pas à pas.
        </p>
      </CardContent>
    </Card>
  </main>
);}