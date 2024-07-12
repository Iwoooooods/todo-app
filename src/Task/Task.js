import { useState } from "react";
import { TITLE_WIDTH_PERCHAR, API_DOMAIN } from '../consts';
import "./task.css";
import { format } from 'date-fns';
import TaskDeleteButton from "./DeleteComponent/TaskDelete";

export default function Task({ task, setShowConfirm, deleteCurrentTask, fetcheInprocessTasks, fetcheCompletedOrOverdueTasks }) {
  const pxPerChar = TITLE_WIDTH_PERCHAR
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  const [titleWidth, setTitleWidth] = useState(Math.max(currentTask.title.length, 1) * pxPerChar);
  const handleToggleDetail = (e) => {
    e.preventDefault();
    setShowDetail(!showDetail);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevState) => ({
      ...prevState,
      [name]: value,
      // title: "test",
    }));
    if (name === 'title') {
      setTitleWidth(Math.max(currentTask.title.length, 1) * pxPerChar);
    }
  };

  const handleCheckboxChange = async (e) => {

    setCurrentTask((prevState) => ({
      ...prevState,
      is_completed: e.target.checked,
    }))
    const url = `${API_DOMAIN}/api/tasks/task_update/${currentTask.id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_completed: e.target.checked }),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.code === 200) {
        // console.log(currentTask);
        await fetcheInprocessTasks();
        await fetcheCompletedOrOverdueTasks();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  }

  const handleDoubleClick = () => {
    setIsEditing(true);
  }

  const handleBlur = async (e) => {
    const { name, value } = e.target
    setCurrentTask((prevState) => ({
      ...prevState,
      [name]: value
    }))
    if (name === 'title') {
      setTitleWidth(Math.max(currentTask.title.length, 1) * pxPerChar);
    }
    await handleUpdate()
    setIsEditing(false);
    if (name === 'content') {
      setShowDetail(false);
    }
  }

  const handleKeyDown = async (e) => {
    if (isEditing) {
      if (e.key === 'Enter') {
        //提交修改请求
        await handleUpdate()
        setIsEditing(false);
        const name = e.target.name;
        if (name === 'title') {
          setTitleWidth(Math.max(currentTask.title.length, 1) * pxPerChar);
        }
      } else if (e.key === 'Escape') {
        const name = e.target.name
        setCurrentTask((prevState) => ({
          ...prevState,
          [name]: task[name]
        }))
        setIsEditing(false);
        if (name === 'title') {
          setTitleWidth(Math.max(currentTask.title.length, 1) * pxPerChar);
        }
      }
    }
  }

  const handleUpdate = async () => {
    const url = `${API_DOMAIN}/api/tasks/task_update?task_id=${currentTask.id}&user_id=1`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentTask),
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.code === 200) {
        fetcheInprocessTasks();
        // fetcheCompletedOrOverdueTasks();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  }

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

  // useEffect( () => {
  //   if(currentTask && currentTask.id !== undefined){
  //     handleUpdate();
  //   }
  // }, [currentTask.is_completed]);

  return (
    <>
      <div className="task-container">
        <TaskDeleteButton
          task={currentTask}
          setCurrentTask={deleteCurrentTask}
          setShowConfirm={setShowConfirm}
        />
        {/* <form onSubmit={handleUpdate}> */}
        <form>
          <input
            className="task-title"
            name="title"
            type="text"
            value={currentTask.title}
            readOnly={!isEditing}
            onChange={handleInputChange}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            style={{ width: `${titleWidth}px` }}
          />
          {task.deadline &&
            <div className={deadlineClass}>
              <span style={{ display: 'inline-block' }}>Deadline:</span>
              <input
                name="deadline"
                type="date"
                value={format(new Date(currentTask.deadline), 'yyyy-MM-dd')}
                readOnly={!isEditing}
                onChange={handleInputChange}
                onClick={handleDoubleClick}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                style={{ display: 'inline-block' }}
              />
            </div>
          }
          <input
            className="task-brief"
            name='brief'
            type='text'
            readOnly={!isEditing}
            onChange={handleInputChange}
            value={currentTask.brief ? currentTask.brief : "No details provided"}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleToggleDetail} style={{ backgroundColor: 'rgba(255, 0, 0, 0)', border: 'none', display: 'block', fontSize: '15px' }}>{showDetail ? '▼ ' : '▶ '}Content</button>
          <textarea
            className={`task-content-${showDetail ? "expanded" : "collapsed"}`}
            name='content'
            readOnly={!isEditing}
            onChange={handleInputChange}
            value={currentTask.content}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <p style={{ height: "0px", margin: "0px", padding: "0px" }}></p>
          <input
            className="task-completed"
            name="is_completed"
            type="checkbox"
            checked={currentTask.is_completed}
            //   onChange={async (e) => {
            //     // setIsEditing(true);
            //     setCurrentTask((prevState) => 
            //       ({...prevState, is_completed: e.target.checked})
            //     );
            // }}
            onChange={handleCheckboxChange}
          />
          <span>{currentTask.is_completed ? "completed" : "not yet completed"}</span>
        </form>
      </div>
    </>
  );
}