'use client'
import { nanoid } from "nanoid";
import React, { useState } from "react";

import Footer from "@components/Footer";
import Header from "@components/Header";
import Task from "@components/Task";
import TaskInput from "@components/TaskInput";



interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  deleteTaskFunc?: (taskId: number) => void; // callback function
  toggleDoneTaskFunc?: (taskId: number) => void; // callback function
}

export default function Home() {

  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const addTask = (newTaskTitle: string) => {
    const newTask: TaskItem = {
      id: nanoid(),
      title: newTaskTitle,
      completed: false,
    };
    const newTasks: TaskItem[] = [...tasks, newTask];
    if(newTaskTitle != ""){
      setTasks(newTasks);
    }
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const toggleDoneTask = (taskId: string) => {

    const newTasks = structuredClone(tasks);
    const task: any  = newTasks.find((x) => x.id === taskId);
    task.completed = !task.completed;
    setTasks(newTasks);
  };

  return (
    <div className="container mx-auto">
      <Header />
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        <p className="text-center text-secondary fst-italic">
          All ({tasks.length}) Done ({tasks.filter((task)=>{task.completed}).length})
        </p>

        {/* task input */}

        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}

        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      <Footer year="2024" fullName="Yutthakarn Sajui" studentId="660610787" />
    </div>
  );
}
