import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API URL
});

export const addTodo = async (params) => {
  try {
    const res = await api.post("/todos", params);
    return res;
  } catch (error) {
    console.error("Error creating todo:", error);
  }
};

export const fetchTodos = async () => {
  try {
    const res = await api.get("/todos");
    return res;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const updateTodo = async (id, params) => {
  try {
    const res = await api.put(`/todos/${id}`, params);
    return res;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await api.delete(`/todos/${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
