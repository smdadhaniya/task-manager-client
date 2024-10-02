interface ITask {
  title: string;
  description: string;
  status: ["pending", "in-progress", "completed"];
  dueDate: string;
}
interface IUpdate {
  status: ["pending", "in-progress", "completed"];
  dueDate: string;
}

const fetchData = async (
  route: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: ITask | IUpdate,
  header?: HeadersInit
) => {
  const URL = `http://localhost:5000/${route}`;

  const defaultHeader = {
    "Content-Type": "application/json",
    ...header,
  };

  const options: RequestInit = {
    method,
    headers: defaultHeader,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`Http error ${response.status}`);
    }
    if (method === "GET") {
      return await response.json();
    }
    return response.status === 204 ? null : await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await fetchData("task/tasks", "GET");
    return await response;
  } catch (error) {
    return error;
  }
};

export const fetchTaskById = async (taskId: string) => {
  try {
    const response = await fetchData(`task/task/${taskId}`, "GET");
    return await response;
  } catch (error) {
    return error;
  }
};

export const createTask = async (payload: ITask) => {
  try {
    const response = await fetchData(`task/task`, "POST", payload);
    return await response;
  } catch (error) {
    return error;
  }
};

export const updateTask = async (taskId: string, payload: IUpdate) => {
  try {
    const response = await fetchData(`task/task/${taskId}`, "PUT", payload);
    return await response;
  } catch (error) {
    return error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await fetchData(`task/task/${taskId}`, "DELETE");
    return await response;
  } catch (error) {
    return error;
  }
};
