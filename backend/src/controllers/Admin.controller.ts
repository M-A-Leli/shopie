import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/Admin.service';

class AdminController {

  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  getAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admins = await this.adminService.getAllAdmins();
      res.status(200).json(admins);
    } catch (error: any) {
      next(error);
    }
  }

  getAdminById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await this.adminService.getAdminById(req.params.id);
      res.status(200).json(admin);
    } catch (error: any) {
      next(error);
    }
  }

  createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await this.adminService.createAdmin(req.body);
      res.status(201).json(admin);
    } catch (error: any) {
      next(error);
    }
  }

  updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await this.adminService.updateAdmin(req.params.id, req.body);
      res.status(200).json(admin);
    } catch (error: any) {
      next(error);
    }
  }

  deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.adminService.deleteAdmin(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AdminController();
