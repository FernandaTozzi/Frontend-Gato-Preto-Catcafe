const API_URL = "http://localhost:8080/cats";

//Método Get
export const getCats = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

//Método Post
export const createCat = async (cat: any) => {
  const res = await fetch("http://localhost:8080/cats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  });

  return res.json();
};

//Método Delete
export const deleteCat = async (id: number) => {
  await fetch(`http://localhost:8080/cats/${id}`, {
    method: "DELETE",
  });
};

//Método Update
export const updateCat = async (id: number, cat: any) => {
  const res = await fetch(`http://localhost:8080/cats/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  });

  return res.json();
};