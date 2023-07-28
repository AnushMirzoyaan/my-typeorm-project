import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    const userRepository = getRepository(User);
    const user = userRepository.create({ name, email, age });
    userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email, age } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) return res.status(404).json({ error: "user not found :(" });
    user.name = name;
    user.email = email;
    user.age = age;
    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) return res.status(404).json({ error: "user not founu" });
    await userRepository.remove(user);
    res.json({ message: "user is deleted" });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};
