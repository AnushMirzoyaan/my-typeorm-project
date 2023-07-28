import express from "express";
import { Long, createConnection } from "typeorm";
import { User } from "./entity/User";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "./controller/UserController";

const app = express();
const PORT = 3000;

app.use(express.json());

createConnection({
  type: "postgres",
  host: "optimistic_mahavira",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "",
  entities: [User],
  synchronize: true,
})
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log("TypeORM connection error:", err));

app.get("/users", getUsers);
app.post("/users", createUser);
app.put("/users", updateUser);
app.delete("/users/:id", deleteUser);

app.listen(PORT, () => {
  console.log(`server is listening to ${PORT}`);
});
