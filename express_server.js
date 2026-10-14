const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Headers :", req.headers);
  console.log("Body :", req.body);
  res.send("Hello World!");
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/some-html", (req, res) => {
  res.send("<html><body><h1>bonjour html</h1></body></html>");
});

app.get("/some-json", (req, res) => {
  let nom = "Jane";
  let age = 22;

  res.json({ nom, age });
});

app.get("/transaction", (req, res) => {
  let transaction = [100, 2000, 3000];

  res.json({ transaction });
});

app.get("/exo-query-string", (req, res) => {
  console.log(req.query);

  res.send(`<h1>${req.query.age}</h1>`);
});

app.get("/get-user/:userId", (req, res) => {
  console.log(req.params);

  const userId = req.params.userId;

  res.send(`<h1>Utilisateur n°${userId}</h1>`);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/new-task", (req, res) => {
  const { title, description, isDone } = req.body;

  if (typeof title !== "string" || typeof description !== "string") {
    return res
      .status(400)
      .json({ error: "title et description (string) sont requis" });
  }

  const task = {
    id: nextId++,
    title,
    description,
    isDone: isDone === true,
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put("/update-task/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Tâche introuvable" });
  }

  const { title, description, isDone } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (isDone !== undefined) task.isDone = isDone;

  res.json(task);
});

app.delete("/delete-task/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Tâche introuvable" });
  }

  const [deleted] = tasks.splice(index, 1);
  res.json(deleted);
});

app.use((req, res, next) => {
  res.status(404).send("404 - Page non trouvée");
});
