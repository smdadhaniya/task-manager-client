import React, { useEffect, useState } from "react";
import { fetchTasks } from "./task.api";

const TaskListing: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTasks();
      console.log("result.tasks",result)
      setTasks(result.tasks);
    };
    fetchData();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {(tasks ?? []).map((list) => (
            <tr key={list.id}>
              <td>{list.title}</td>
              <td>{list.description}</td>
              <td>{list.status}</td>
              <td>{list.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListing;
