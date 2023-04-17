import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import { Toaster, toast } from "react-hot-toast";
import TaskItem from "../components/TaskItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false)

  const {isAuthenticated} = useContext(Context)

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my-tasks`, {
        withCredentials: true,
      })
      .then((res) => setTasks(res.data.tasks))
      .catch((e) => toast.error(e.response.data.message));
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={'/login'} />

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              placeholder="Title"
              required
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              type="text"
              placeholder="Description"
              required
            />
            <button disabled={loading}>Add Task</button>
          </form>
        </section>
        <Toaster />
      </div>
      <section className="todosContainer">
        {tasks?.map((task) => (
          <TaskItem
            key={task._id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={task._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
