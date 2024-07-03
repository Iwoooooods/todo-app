import { useState } from "react";
import "./task_form.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { API_DOMAIN } from "../../consts";

export default function TaskForm({ fetchTasks }) {
  const [showFrom, setShowForm] = useState(false);
  const [task, setTask] = useState({
    user_id: 1,
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${API_DOMAIN}/api/tasks/create_task`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.code == 200) {
        console.log("Submitted successfully:", result);
        setShowForm(false);
        fetchTasks();
        setTask({
          user_id: 1,
          title: "",
          content: "",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div>
      {!showFrom && <button onClick={() => setShowForm(true)} id="add-button">
        <FontAwesomeIcon icon={faPlus} />  
      </button>}
      {showFrom && (
        <form onSubmit={handleSubmit} className="form-container">
          <button onClick={() => setShowForm(false)} id="cancel-button">
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <input
            name="title"
            value={task.title}
            onChange={handleInputChange}
            placeholder="Title(Required)"
          />
          <textarea
            name="content"
            value={task.content}
            onChange={handleInputChange}
            placeholder="Content(Required)"
          />
          <input
            name="brief"
            value={task.brief}
            onChange={handleInputChange}
            placeholder="Brief"
          />
          <input
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleInputChange}
            placeholder="Deadline"
          />
          <button
            type="submit"
            disabled={(task.title.trim() === "") | (task.content.trim() === "")}
            id="submit-button"
            style={{ opacity: (task.title.trim() === "") | (task.content.trim() === "") ? 0.5 : 1 }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
