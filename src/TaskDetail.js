export default function TaskDetail({ task, showDetail }) {
  //   console.log(task.content);
  return (
    <div>
      {showDetail ? (
        <p>Content: {task.content}</p>
      ) : (
        <p>Brief: {task.brief ? task.brief : "No details provided"}</p>
      )}
      <p>{task.is_completed ? "completed" : "not completed"}</p>
    </div>
  );
}
