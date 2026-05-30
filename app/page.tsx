"use client";

import { useEffect, useState } from "react";
import { Task } from "../types/task";
import { getTasks, createTask, deleteTask, updateTask } from "../services/tasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log(tasks)
  useEffect(() => {
//GET
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);
//POST
  async function handleAddTask(title: string) {
    const newTask = await createTask(title);
    setTasks([...tasks, newTask]);
  }
//DELETE
 async function handleDeleteTask(id: string) {
  await deleteTask(id);
  setTasks((prevTasks) =>
    prevTasks.filter((task) => task._id !== id));}
//PUT
async function handleToggleTask(id: string) {
  const updatedTask = await updateTask(id);
  console.log(updatedTask);
  setTasks((prevTasks) =>
    prevTasks.map((task) => {
      if (task._id === id) {
        return updatedTask;}
      return task;}) );}
  return (
    <main>
      <h1>Luma</h1>

      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} />

    </main>
  );
}