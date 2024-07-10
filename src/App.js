import { useEffect, useState } from "react";
import TaskList from "./Task/TaskList";
import TaskForm from "./Task/CreateComponent/TaskForm";
import CompletedOrOverdueTasks from "./Task/CompletedOrOverdueTasks";
import { API_DOMAIN } from './consts';
import WarningDialog from "./Components/WarningDialog";

export default function App() {
  const [inProcessTasks, setInProcessTasks] = useState([]);
  const [completedOrOverdueTasks, setCompletedOrOverdueTasks] = useState([])
  const [showWarning, setShowWarning] = useState(false);
  const [warningTaskNum, setWarningTaskNum] = useState(0)

  async function fetcheInprocessTasks() {
    try {
      // const resp = await fetch(`http://127.0.0.1:8080/api/tasks/in_process/{current_user_id}`)
      const resp = await fetch(`${API_DOMAIN}/api/tasks/in_process/1`);
      const result = await resp.json();
      setInProcessTasks(() => ([...result.data.tasks]));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetcheCompletedOrOverdueTasks() {
    try {
      // const resp = await fetch(`http://127.0.0.1:8080/api/tasks/completed_or_overdue/{current_user_id}`)
      const resp = await fetch(`${API_DOMAIN}/api/tasks/completed_or_overdue/1`);
      const result = await resp.json();
      setCompletedOrOverdueTasks(() => ([...result.data.tasks]));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  //render warning message if user's tasks' remaining time is less than 24 hours
  useEffect(async () => {
    try {
      const resp = await fetch(`${API_DOMAIN}/api/tasks/...`);
      const result = await resp.json();
      if (result.code === 200 & result.warning_task_num > 0) {
        setShowWarning(true);
        setWarningTaskNum(result.warning_task_num);
      }
    } catch (error) {

    }
  }, [])


  return (
    <>
      <WarningDialog showWarning={showWarning} message={`There are ${warningTaskNum} tasks overdue today! Hurry up!!`} />
      <TaskForm fetchTasks={fetcheInprocessTasks} />
      <TaskList tasks={inProcessTasks} fetcheInprocessTasks={fetcheInprocessTasks} fetcheCompletedOrOverdueTasks={fetcheCompletedOrOverdueTasks} />
      <CompletedOrOverdueTasks tasks={completedOrOverdueTasks} fetcheInprocessTasks={fetcheInprocessTasks} fetcheCompletedOrOverdueTasks={fetcheCompletedOrOverdueTasks} />
    </>
  );
}
