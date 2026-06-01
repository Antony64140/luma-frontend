const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}
//GET
export async function getTasks() {
 try {
    const response = await fetch(
      `${API_URL}/tasks`
    );

    if (!response.ok) {
      throw new Error('Erreur récupération tâches');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//POST
export async function createTask(title: string) {
   try {
    const response = await fetch(
       `${API_URL}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          completed: false, }),});
    if (!response.ok) {
      throw new Error("Erreur création tâche");}
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;}}

//DELETE
export async function deleteTask(id: string) {
   try {
    const response = await fetch(
      `${API_URL}/tasks/${id}`,{
        method: "DELETE",});
    if (!response.ok) {
      throw new Error("Erreur suppression tâche");}
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;}}

//PUT
export async function updateTask(id: string) {
 try {
    const response = await fetch(
      `${API_URL}/tasks/${id}`,{
        method: "PUT",});
    if (!response.ok) {
      throw new Error("Erreur modification tâche");}
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;}}


//edit
export async function editTask(
  id: string,
  title: string) {
  try {
    const response = await fetch(
      `${API_URL}/tasks/${id}/title`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,}),});
    if (!response.ok) {
      throw new Error("Erreur modification titre");}
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;}}