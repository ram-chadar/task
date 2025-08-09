import { useEffect, useState } from "react";
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
      const updated = [...listOfForm];
      updated[editIndex] = formData;
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
  // Count tasks by priority
  // const priorityCounts = {
  //   LOW: listOfForm.filter((t) => t.priority === "LOW").length,
  //   MEDIUM: listOfForm.filter((t) => t.priority === "MEDIUM").length,
  //   HIGH: listOfForm.filter((t) => t.priority === "HIGH").length,
  // };

  // // Count tasks by status
  // const statusCounts = {
  //   TODO: listOfForm.filter((t) => t.status === "TODO").length,
  //   INPROGRESS: listOfForm.filter((t) => t.status === "INPROGRESS").length,
  //   DONE: listOfForm.filter((t) => t.status === "DONE").length,
  // };

  const [priorityCounts, setPriorityCounts] = useState({
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
  });

  const [statusCounts, setStatusCounts] = useState({
    TODO: 0,
    INPROGRESS: 0,
    DONE: 0,
  });

  useEffect(() => {
    setPriorityCounts({
      LOW: listOfForm.filter((t) => t.priority === "LOW").length,
      MEDIUM: listOfForm.filter((t) => t.priority === "MEDIUM").length,
      HIGH: listOfForm.filter((t) => t.priority === "HIGH").length,
    });

    setStatusCounts({
      TODO: listOfForm.filter((t) => t.status === "TODO").length,
      INPROGRESS: listOfForm.filter((t) => t.status === "INPROGRESS").length,
      DONE: listOfForm.filter((t) => t.status === "DONE").length,
    });
  }, [listOfForm]);

  

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-50 py-2">
        <h1 className="text-2xl font-bold mb-4">Task Management</h1>
        <div className="flex w-full max-w-5xl justify-between mb-4  ">
          {/* Priority summary left */}
          <div className="bg-white shadow rounded px-6 py-4 flex flex-col items-start w-1/4">
            <h2 className="text-lg font-bold mb-2 text-blue-600">
              Priority Summary
            </h2>
            <div className="text-gray-700">
              Low:{" "}
              <span className="font-bold text-blue-500">
                {priorityCounts.LOW}
              </span>
            </div>
            <div className="text-gray-700">
              Medium:{" "}
              <span className="font-bold text-yellow-500">
                {priorityCounts.MEDIUM}
              </span>
            </div>
            <div className="text-gray-700">
              High:{" "}
              <span className="font-bold text-red-500">
                {priorityCounts.HIGH}
              </span>
            </div>
          </div>

          {/* Form center */}
          <form
            onSubmit={submitHandler}
            className="bg-white shadow-md rounded px-4 pt-6 pb-4 w-1/2 mx-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Assignee
              </label>
              <input
                type="text"
                name="taskAssignee"
                value={formData.taskAssignee}
                onChange={inputHandler}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Task Name
              </label>
              <input
                type="text"
                name="taskName"
                value={formData.taskName}
                onChange={inputHandler}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Priority
              </label>
              <select
                name="priority"
                id=""
                value={formData.priority}
                onChange={inputHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300  focus:shadow-outline"
              >
                <option value="">Select Priority</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                name="status"
                id=""
                value={formData.status}
                onChange={inputHandler}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-outline"
              >
                <option value="">Status of Task</option>
                <option value="TODO">TODO</option>
                <option value="INPROGRESS">INPROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {editIndex === null ? "Add" : "Update"}
            </button>
          </form>

          {/* Status summary right */}
          <div className="bg-white shadow rounded px-6 py-4 flex flex-col items-end w-1/4">
            <h2 className="text-lg font-bold mb-2 text-green-600">
              Status Summary
            </h2>
            <div className="text-gray-700">
              Todo:{" "}
              <span className="font-bold text-red-500">
                {statusCounts.TODO}
              </span>
            </div>
            <div className="text-gray-700">
              In Progress:{" "}
              <span className="font-bold text-yellow-500">
                {statusCounts.INPROGRESS}
              </span>
            </div>
            <div className="text-gray-700">
              Done:{" "}
              <span className="font-bold text-green-500">
                {statusCounts.DONE}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Assignee</th>
                <th className="py-2 px-4 border-b">Task Name</th>
                <th className="py-2 px-4 border-b">Priority</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {listOfForm.map((item, index) => (
                <tr
                  key={index}
                  className={`text-center  ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-red-100"
                  }`}
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{item.taskAssignee}</td>
                  <td className="py-2 px-4 border-b">{item.taskName}</td>
                  <td
                    className={`py-2 px-4 border-b ${
                      item.priority === "HIGH"
                        ? "text-red-500"
                        : item.priority === "MEDIUM"
                        ? "text-yellow-500"
                        : "text-green-500"
                    } `}
                  >
                    {item.priority}
                  </td>
                  <td
                    className={`py-2 px-4 border-b ${
                      item.status === "DONE"
                        ? "text-green-500"
                        : item.status === "INPROGRESS"
                        ? "text-yellow-500"
                        : "text-red-500"
                    } `}
                  >
                    {item.status}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => deleteData(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => showData(index)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
