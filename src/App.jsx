import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    taskAssignee: "",
    taskName: "",
    priority: "",
    status: "",
  });

  const [listOfForm, setListOfForm] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const resetData = () => {
    setFormData({
      taskAssignee: "",
      taskName: "",
      priority: "",
      status: "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editIndex === null) {
      setListOfForm((oldList) => [...oldList, formData]);
    } else {
      const updated=[...listOfForm];
      updated[editIndex]=formData;
      setListOfForm(updated);

      setEditIndex(null);
      resetData();
    }

    resetData();
  };

  const deleteData = (index) => {
    const updatedList = listOfForm.filter((data, i) => i != index);
    setListOfForm(updatedList);
  };

  const showData = (index) => {
    setFormData(listOfForm[index]);
    setEditIndex(index);
  };

  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label>Assignee</label>
            <input
              type="text"
              name="taskAssignee"
              value={formData.taskAssignee}
              onChange={inputHandler}
            />
          </div>

          <div>
            <label>taskName</label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={inputHandler}
            />
          </div>

          <div>
            <label>Priority</label>
            <select
              name="priority"
              id=""
              value={formData.priority}
              onChange={inputHandler}
            >
              <option value="">Select Priority</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          <div>
            <label>Status</label>
            <select
              name="status"
              id=""
              value={formData.status}
              onChange={inputHandler}
            >
              <option value="">Status of Task</option>
              <option value="TODO">TODO</option>
              <option value="INPROGRESS">INPROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>

          <button type="submit">{editIndex === null ? "Add" : "Update"}</button>
        </form>
      </div>

      <hr />

      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>#</th>
            <th style={{ border: "1px solid black" }}>Assignee</th>
            <th style={{ border: "1px solid black" }}>Task Name</th>
            <th style={{ border: "1px solid black" }}>Priority</th>
            <th style={{ border: "1px solid black" }}>Status</th>
            <th style={{ border: "1px solid black" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {listOfForm.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black" }}>{index + 1}</td>
              <td style={{ border: "1px solid black" }}>{item.taskAssignee}</td>
              <td style={{ border: "1px solid black" }}>{item.taskName}</td>
              <td style={{ border: "1px solid black" }}>{item.priority}</td>
              <td style={{ border: "1px solid black" }}>{item.status}</td>
              <td style={{ border: "1px solid black" }}>
                <button onClick={() => deleteData(index)}>Delete</button>
                <button onClick={() => showData(index)}>Show</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
