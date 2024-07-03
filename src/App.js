import { useState } from "react";
import TaskList from "./Task/TaskList";
import TaskForm from "./Task/CreateComponent/TaskForm";
import CompletedOrOverdueTasks from "./Task/CompletedOrOverdueTasks";
import {API_DOMAIN} from './consts';

export default function App() {
  const [inProcessTasks, setInProcessTasks] = useState([]);
  const [completedOrOverdueTasks, setCompletedOrOverdueTasks] = useState([])
  // async function fetchTasks() {
  //   // const resp = await fetch(`${API_DOMAIN}/api/tasks/home?user_id=1`);
  //   // const result = await resp.json();
  //   // setTasks(result.data.tasks);
  //   await fetcheInprocessTasks();
  //   await fetcheCompletedOrOverdueTasks();
  //   console.log(tasks);
  // }

  async function fetcheInprocessTasks(){
    try{
      // const resp = await fetch(`http://127.0.0.1:8080/api/tasks/in_process/{current_user_id}`)
      const resp = await fetch(`${API_DOMAIN}/api/tasks/in_process/1`);
      const result = await resp.json();
      setInProcessTasks(() => ([...result.data.tasks]));
    }catch (error){
      console.error('Error:',error);
    }
  }

  async function fetcheCompletedOrOverdueTasks(){
    try{
      // const resp = await fetch(`http://127.0.0.1:8080/api/tasks/completed_or_overdue/{current_user_id}`)
      const resp = await fetch(`${API_DOMAIN}/api/tasks/completed_or_overdue/1`);
      const result = await resp.json();
      setCompletedOrOverdueTasks(() => ([...result.data.tasks]));
    }catch (error){
      console.error('Error:',error);
    }
  }
  return (
    <>
      <TaskForm fetchTasks={fetcheInprocessTasks} />
      <TaskList tasks={inProcessTasks} fetcheInprocessTasks={fetcheInprocessTasks} fetcheCompletedOrOverdueTasks={fetcheCompletedOrOverdueTasks}/>
      <CompletedOrOverdueTasks tasks={completedOrOverdueTasks} fetcheInprocessTasks={fetcheInprocessTasks}  fetcheCompletedOrOverdueTasks={fetcheCompletedOrOverdueTasks} />
    </>
  );
}
