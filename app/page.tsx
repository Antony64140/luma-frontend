"use client";

import { useEffect, useState, useCallback } from "react";
import { Task } from "../types/task";
import { getTasks, createTask, deleteTask, updateTask, editTask,} from "../services/tasks";
import Notification from "../components/Notification";
import LumaCard from "@/components/LumaCard";
import { useLanguage } from "@/context/LanguageContext";


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notification, setNotification] = useState("");
  const { t } = useLanguage();

  //NOTIFS
  const showMessage = useCallback((message: string) => {
  setNotification(message);

  setTimeout(() => {
    setNotification("");
  }, 5000);
}, []);
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
const handleAddTask = useCallback(async (title: string) => {
  try {
    const taskExists = tasks.some(
  (task) =>
    task.title.trim().toLowerCase() ===
    title.trim().toLowerCase()
);

if (taskExists) {
  showMessage(`⚠️ ${t.task} ${t.taskAlreadyExists}`);
  return;
}
    const newTask = await createTask(title);
    setTasks((prevTasks) => [
      ...prevTasks,
      newTask, ]);showMessage(`✨ ${t.task} ${t.taskCreated}`);
  } catch (error) {
    console.error(error);}
}, [tasks,showMessage, t]);

// DELETE
const handleDeleteTask = useCallback(async (id: string, index : number) => {
  try {
    await deleteTask(id);
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) => task._id !== id));showMessage(
  `🗑️ ${t.task} ${String(index + 1).padStart(2, "0")} ${t.taskDeleted}`);
  } catch (error) {
    console.error(error);}
}, [showMessage, t]);

// PUT completed
const handleToggleTask = useCallback(async (id: string, index : number) => {
  try {
    const updatedTask = await updateTask(id);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task._id === id) {
          return updatedTask;}
        return task; }));
   if (updatedTask.completed) {
  showMessage(  `🎉 ${t.task} ${String(index + 1).padStart(2, "0")} ${t.taskCompleted}`);}
  } catch (error) {
    console.error(error);}
}, [showMessage,t]);

// EDIT title
const handleEditTask = useCallback(async (
  id: string,
  title: string,
  index : number
) => {
  try {
    const updatedTask = await editTask(
      id,
      title);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task._id === id) {
          return updatedTask;}
        return task;}));showMessage(`✏️ ${t.task} ${String(index + 1).padStart(2, "0")} ${t.taskUpdated}`);
  } catch (error) {
    console.error(error);}
}, [showMessage,t]);
  return (
  <main className="min-h-screen bg-green-100 flex items-center justify-center p-6">
    <Notification message={notification} />
    <LumaCard
  tasks={tasks} onAddTask={handleAddTask}onDeleteTask={handleDeleteTask}onToggleTask={handleToggleTask}onEditTask={handleEditTask}/>
  </main>
);}