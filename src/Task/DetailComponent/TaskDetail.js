import './task_detail.css'

export default function TaskDetail({ task, showDetail, onClick }) {
  //   console.log(task.content);
  return (
    <>
    <div>
      <button onClick={onClick} style={{backgroundColor:'rgba(255, 0, 0, 0)', border:'none'}}>{showDetail?'▼':'▶'}</button>
      <p  style={{display: "inline-block"}}>Brief: {task.brief ? task.brief : "No details provided"}</p>
    </div>
    <div className={`task-content ${showDetail?'open':''}`}>{showDetail&&task.content}</div>
    </>
  );
}
