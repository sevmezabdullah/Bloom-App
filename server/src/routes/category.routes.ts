import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '../controllers/category.controller';
import { authenticationMiddleware } from '../middleware';

export const categoryRoutes = express.Router();
categoryRoutes.use(authenticationMiddleware);
categoryRoutes.route('/').get(getAllCategories);
categoryRoutes.route('/create').post(createCategory);
categoryRoutes.route('/delete/:id').delete(deleteCategory);
categoryRoutes.route('/update').put(updateCategory);
