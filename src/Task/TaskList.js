import Task from "./Task";
import { useEffect, useState } from "react";
import ConfirmDialog from "../Components/ConfirmDialog";
import { API_DOMAIN } from "../consts";

export default function TaskList({ fetcheInprocessTasks, fetcheCompletedOrOverdueTasks, tasks }) {
  const [currentTask, setCurrentTask] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetcheInprocessTasks();
  }, []);

  const handleDelete = async () => {
    try {
      // const resp = await fetch(`${API_DOMAIN}/api/tasks/delete_task?task_id=${currentTask.id}&user_id=${currentUser.id}`,
      const resp = await fetch(`${API_DOMAIN}/api/tasks/delete_task?task_id=${currentTask.id}&user_id=1`,
        { method: 'DELETE', }
      );
      const result = await resp.json();
      if (result.code === 200) {
        alert(result.message);
        fetcheInprocessTasks();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setShowConfirm(false);
    }
  }

  return (
    <div>
      <ConfirmDialog onCancel={() => setShowConfirm(false)} onConfirm={handleDelete} isOpen={showConfirm}>
        <p>Are you sure you want to delete this task?</p>
      </ConfirmDialog>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          setShowConfirm={setShowConfirm}
          deleteCurrentTask={setCurrentTask}
          fetcheInprocessTasks={fetcheInprocessTasks}
          fetcheCompletedOrOverdueTasks={fetcheCompletedOrOverdueTasks}
        />
      ))}
    </div>
  );
}
