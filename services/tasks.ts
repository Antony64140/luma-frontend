
//GET
export async function getTasks() {
  const response = await fetch("http://localhost:3000/tasks");
  return response.json();
}

//POST
export async function createTask(title: string) {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  });
  return response.json();
}

//DELETE
export async function deleteTask(id: string) {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

//PUT
export async function updateTask(id: string) {
  const response = await fetch(
    `http://localhost:3000/tasks/${id}`,{
      method: "PUT",
    });
  return response.json();
}