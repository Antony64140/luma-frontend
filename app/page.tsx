"use client";

import { useEffect, useState } from "react";
import { Task } from "../types/task";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  editTask,
} from "../services/tasks";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
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
          return task;}));
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
    <main>
      <h1>Luma</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onEditTask={handleEditTask}/>
    </main>);}