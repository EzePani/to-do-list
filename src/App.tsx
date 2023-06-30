import { useState } from "react";
import { Input, List, Checkbox, Button } from "antd";
import "./App.css";

interface Task {
  id: number;
  description: string;
  state: "completed" | "pending";
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskValue, setEditingTaskValue] = useState("");

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        description: inputValue,
        state: "pending",
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInputValue("");
    }
  };

  const completeTask = (taskId: number) => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, state: "completed" } : task
    );

    setTasks(updatedTasks);
  };
  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
  };

  const editTask = (taskId: number, taskValue: string) => {
    setEditingTaskId(taskId);
    setEditingTaskValue(taskValue);
  };

  const saveTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, description: editingTaskValue } : task
    );

    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskValue("");
  };

  return (
    <div className="app">
      <h1 className="title">ToDo List</h1>
      <div className="input-container">
        <div className="input-wrapper">
          <Input.Search
            className="input-search"
            enterButton="Add Task"
            size="large"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSearch={addTask}
          />
        </div>
      </div>

      <List
        className="task-list"
        dataSource={tasks}
        renderItem={(task) => {
          if (editingTaskId === task.id) {
            return (
              <List.Item className="task-item">
                <Input
                  className="edit-input"
                  value={editingTaskValue}
                  onChange={(e) => setEditingTaskValue(e.target.value)}
                />
                <Button
                  className="edit-save"
                  type="primary"
                  onClick={() => saveTask(task.id)}
                >
                  Save
                </Button>
              </List.Item>
            );
          }

          return (
            <List.Item
              className={`task-item ${
                task.state === "completed" ? "completed" : ""
              }`}
            >
              <div className="task-content">
                <Checkbox
                  className="task-checkbox"
                  checked={task.state === "completed"}
                  onChange={() => completeTask(task.id)}
                />
                <span>{task.description}</span>
              </div>
              <div className="task-actions">
                <Button
                  className="task-edit"
                  onClick={() => editTask(task.id, task.description)}
                >
                  Edit
                </Button>
                <Button
                  className="task-delete"
                  danger
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default App;
