import React, { useEffect, useState } from "react";
import "./todo.css";
import Navbar from "../Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdOutlineDone } from "react-icons/md";
import { GiLargePaintBrush } from "react-icons/gi";
import Home from "../Home";

const Todo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });
  const isLoggedIn = localStorage.getItem("token") ? true : false;
  const username = localStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
  };
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8081/api/v2`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Network response was not ok.");

      const data = await res.json();
      setTasks(data.tasks);
    } catch (error) {
      console.log("Failed to fetch:", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8081/api/v2`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, isCompletedTask: false }),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      setInputs({
        title: "",
        description: "",
        priority: "Medium",
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const updateTaskStatus = async (taskId, title, description, priority) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8081/api/v2/${taskId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
        }),
      });
      console.log("Response:", response);
      const data = await response.json();
      console.log("Data:", data);
      if (!response.ok) {
        throw new Error("Failed to update task.");
      }

      handleClose();
      setInputs({
        title: "",
        description: "",
        priority: "Medium",
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const taskComplete = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8081/api/v2/${taskId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompletedTask: true,
        }),
      });
      console.log("Response:", response);
      const data = await response.json();
      console.log("Data:", data);
      if (!response.ok) {
        throw new Error("Failed to update task.");
      }
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8081/api/v2/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete task.");
      }
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setInputs({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
    handleOpen();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Navbar />
      {isLoggedIn ? (
        <div className="container">
          <ToastContainer />
          <div className="todo-main d-flex justify-content-center align-items-center my-4 flex-column">
            <div className="d-flex flex-column w-50 p-1">
              <input
                type="text"
                placeholder="TITLE"
                className="form-control my-2"
                name="title"
                onChange={change}
                value={inputs.title}
              />
              <input
                type="text"
                placeholder="DESC"
                className="form-control my-2"
                name="description"
                onChange={change}
                value={inputs.description}
              />
            </div>
            <div className="d-flex flex-column w-25 p-1">
              <select
                name="priority"
                className="form-control my-2"
                value={inputs.priority}
                onChange={change}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="w-40 d-flex justify-content-end my-2">
              <button className="btn-add" onClick={handleCreateTask}>
                Add
              </button>
            </div>
          </div>
          <div className="todo-body">
            <TableContainer component={Paper}>
              <Table>
                <TableHead className="heading">
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {" "}
                        {item.isCompletedTask ? "Completed" : "In Progress"}
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <p
                          className={`priority-${item.priority.toLowerCase()}`}
                        >
                          {item.priority}
                        </p>
                      </TableCell>
                      {!item.isCompletedTask && (
                        <TableCell className="icons">
                          <MdOutlineDone
                            onClick={() => taskComplete(item._id)}
                          />
                        </TableCell>
                      )}
                      {/* <TableCell>
                      <MdOutlineDone onClick={() => taskComplete(item._id)} />
                    </TableCell> */}

                      <TableCell className="icons">
                        <GrDocumentUpdate
                          onClick={() => handleEditTask(item)}
                        />
                        <Modal
                          open={open && editingTask?._id === item._id}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <div>
                              <div className="container">
                                <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
                                  <h3>Update Your Task</h3>
                                  {/* Input fields for updating task */}
                                  <input
                                    type="text"
                                    placeholder="TITLE"
                                    className="todo-inputs my-4 w-100 p-3"
                                    name="title"
                                    onChange={change}
                                    value={inputs.title}
                                  />
                                  <input
                                    type="text"
                                    placeholder="DESC"
                                    className="todo-inputs my-4 w-100 p-3"
                                    name="description"
                                    onChange={change}
                                    value={inputs.description}
                                  />
                                  <select
                                    name="priority"
                                    className="todo-inputs my-4  p-3"
                                    value={inputs.priority}
                                    onChange={change}
                                  >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                  </select>
                                  <div>
                                    <button
                                      className="btn btn-dark my-4"
                                      onClick={() =>
                                        updateTaskStatus(
                                          item._id,
                                          inputs.title,
                                          inputs.description,
                                          inputs.priority
                                        )
                                      }
                                    >
                                      UPDATE
                                    </button>
                                    <button
                                      className="btn btn-danger my-4 mx-3"
                                      onClick={handleClose}
                                    >
                                      Close
                                    </button>
                                    <button></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Box>
                        </Modal>
                        <AiFillDelete onClick={() => deleteTask(item._id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};

export default Todo;
