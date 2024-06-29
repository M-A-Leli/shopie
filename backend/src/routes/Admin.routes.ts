import { Router } from 'express';
import AdminController from '../controllers/Admin.controller';

const router = Router();

router.get('/', AdminController.getAllAdmins); // Get all admins
router.get('/:id', AdminController.getAdminById); // Get admin by id
router.post('/', AdminController.createAdmin); // Create admin
router.put('/:id', AdminController.updateAdmin); // Update admin
router.delete('/:id', AdminController.deleteAdmin); // Delete admin

export default router;
