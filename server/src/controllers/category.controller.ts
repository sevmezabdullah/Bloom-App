import Category from '../models/category';
import { Response } from 'express';
import { ICategory } from '../types';
import { AuthRequest } from '../middleware';
export const getAllCategories = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { user } = request;
    const categories = await Category.find({
      user,
    });
    return response.send(categories);
  } catch (error) {
    console.log('Error in get all categories', error);
    throw error;
  }
};

export const createCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { color, icon, isEditable, name }: ICategory = request.body;
    const { user } = request;
    const category = await Category.create({
      color,
      icon,
      isEditable,
      name,
      user,
    });
    return response.send(category);
  } catch (error) {
    console.log('Error in creating Category', error);
    throw error;
  }
};

export const deleteCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { id } = request.params;
    const deletedCategory = await Category.deleteOne({ _id: id });

    if (deletedCategory.deletedCount > 0) {
      return response.status(200).json({ message: 'category deleted' });
    } else {
      return response
        .status(404)
        .json({ message: 'Could not found category to delete' });
    }
  } catch (error) {
    console.log('Error in delete category', error);
    response.send({ error: 'Something went wrong' });
    throw error;
  }
};

export const updateCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = request.body;

    await Category.updateOne(
      { _id },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );

    response.send({ message: 'Category updated successfully' });
  } catch (error) {
    console.log('Error in update category', error);
    response.send({ error: 'Error in updating the category' });
    throw error;
  }
};
