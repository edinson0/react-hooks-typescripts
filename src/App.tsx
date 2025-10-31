import React, { useState, useRef } from "react";
import "bootswatch/dist/morph/bootstrap.min.css";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    console.log(tasks);
    setNewTask('');
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  }

  const removeTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    taskInput.current?.focus();
  }

  const taskInput = useRef<HTMLInputElement>(null);

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  placeholder="Escribe una nueva tarea..."
                  autoFocus
                />
                <button className="btn btn-success w-100 mt-2">Save</button>
              </form>
            </div>
          </div>
          {tasks.map((task: ITask, index: number) => (
            <div className="card card-body mt-2" key={index}>
              <h2 style={{textDecoration: task.done ? 'line-through' : 'none'}}>{task.name}</h2>
              <p>{task.done ? "Completed" : "Pending"}</p>
              <div>
                <button className="btn btn-secondary" onClick={() => toggleDoneTask(index)}>
                  {task.done ? "✅" : "⬜"}
                </button>
                <button className="btn btn-danger" onClick={() => removeTask(index)}>
                  ❌
                </button> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
