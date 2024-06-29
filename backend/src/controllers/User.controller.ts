import { Request, Response, NextFunction } from 'express';
import UserService from '../services/User.service';

class UserController {

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      next(error);
    }
  }

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (error: any) {
      next(error);
    }
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.userService.createUser(req.body);
      console.log(newUser)
      res.status(201).json(newUser);
    } catch (error: any) {
      next(error);
    }
  }

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.userService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error: any) {
      next(error);
    }
  }

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).end();
    } catch (error: any) {
      next(error);
    }
  }

  // ! req.user.id
  getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userProfile = await this.userService.getUserById(req.params.id);
      res.json(userProfile);
    } catch (error: any) {
      next(error);
    }
  }

  // ! req.user.id
  updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedProfile = await this.userService.createUser(req.body);
      res.status(201).json(updatedProfile);
    } catch (error: any) {
      next(error);
    }
  }

  searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.searchUsers(req.query.q as string);
      res.json(users);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UserController();
