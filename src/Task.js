import { useState } from "react";
import "./task.css"; // 确保这个路径是正确的
import TaskDetail from "./TaskDetail";
import { format } from 'date-fns';
import TaskDeleteButton from "./TaskDelete";

export default function Task({ task, fetchTasks, setCurrentTask, setShowConfirm }) {
  const [showDetail, setShowDetail] = useState(false);

  const handleToggleDetail = () => {
    setShowDetail((prev) => !prev);
  };

  const calculateTimeLeft = () => {
    const today = new Date();
    const deadlineDate = new Date(task.deadline);
    const timeDiff = deadlineDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const daysLeft = calculateTimeLeft();
  let deadlineClass = "task-deadline";

  if (daysLeft < 1) {
    deadlineClass += " red"; // Urgent: red background
  } else if (daysLeft < 7) {
    deadlineClass += " yellow"; // Warning: yellow background
  } else {
    deadlineClass += " green"; // On track: green background
  }
  //   console.log(task.content);
  return (
    <>
      <div className="task-container" onClick={handleToggleDetail}>
        <TaskDeleteButton 
          task={task} 
          fetchTasks={fetchTasks} 
          setCurrentTask={setCurrentTask} 
          setShowConfirm={setShowConfirm}
        />
        <span className="task-title">{task.title}</span>
        {task.deadline && (
          <span className={deadlineClass}>Deadline: {format(new Date(task.deadline), 
                                                      'yyyy-MM-dd')}</span>
        )}
        <TaskDetail task={task} showDetail={showDetail} />
      </div>
    </>
  );
}
