import Task from "./Task";
import { useEffect, useState } from "react";
import ConfirmDialog from "../Components/ConfirmDialog";

export default function TaskList({ fetchTasks, tasks }) {
  const [currentTask, setCurrentTask] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async ()=>{
    try{
        const resp = await fetch(`http://127.0.0.1:8080/api/tasks/delete_task/${currentTask.id}`,
            {method: 'DELETE',}
        );
        const result = await resp.json();
        if (result.code == 200){
            console.log("Delete successfully:", result);
            fetchTasks();
        }
    }catch (error){
        console.error('Error:',error);
    }finally{
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
          fetchTasks={fetchTasks}
        />
      ))}
    </div>
  );
}
