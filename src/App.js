import { useState } from "react";
import TaskList from "./Task/TaskList";
import TaskForm from "./Task/CreateComponent/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  async function fetchTasks() {
    const resp = await fetch(`http://127.0.0.1:8080/api/tasks/home?user_id=1`);
    const result = await resp.json();
    setTasks(result.data.tasks);
  }
  return (
    <>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      <TaskForm fetchTasks={fetchTasks} />
    </>
  );
}
