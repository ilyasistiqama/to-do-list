import { useEffect, useState } from "react";
import "./assets/styles/App.css";
import { BsPlusCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "./utils/Api";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [isFetch, setIsFetch] = useState(true);

  useEffect(() => {
    if (isFetch) {
      try {
        fetchTodos().then((res) => {
          setIsFetch(false);

          setTodos(res.data.reverse());
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [isFetch]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (task.length === 0) {
      alert("Please enter a task!");
      return;
    }

    try {
      await addTodo({
        id: uuidv4(),
        task: task,
        completed: false,
      }).then((res) => {
        if (res.status === 201) {
          setTask("");
          setIsFetch(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickTodo = async (todo) => {
    try {
      await updateTodo(todo.id, {
        task: todo.task,
        completed: !todo.completed,
      }).then((res) => {
        if (res.status === 200) {
          setIsFetch(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickDeleteTodo = async (id) => {
    try {
      await deleteTodo(id).then((res) => {
        if (res.status === 200) {
          setIsFetch(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>What are u doing today?</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-to-do"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <span className="icon-to-do-add" onClick={(e) => handleAddTodo(e)}>
          <BsPlusCircleFill />
        </span>
      </div>
      <div className="todo-container">
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-head">
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.task}
              </span>
              <div className="">
                <input
                  type="checkbox"
                  className="todo-check"
                  checked={todo.completed}
                  onChange={() => handleClickTodo(todo)}
                />
                <BsThreeDotsVertical className="icon-to-do-option" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
