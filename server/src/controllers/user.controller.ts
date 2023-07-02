import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../types';

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).send('user already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return response
      .status(201)
      .send({ message: 'User created successfully', user: user });
  } catch (error) {
    console.log('User creating error ', error);
    throw error;
  }
};

const getUserToken = (_id) => {
  const authenticatedUserToken = jwt.sign({ _id }, 'express', {
    expiresIn: '7d',
  });
  return authenticatedUserToken;
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(409).send({ message: 'User is not exists' });
    }
    const isPasswordIdentical = await bcrypt.compare(
      password,
      (
        await existingUser
      ).password
    );
    if (isPasswordIdentical) {
      const token = getUserToken(existingUser._id);
      return response.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return response.status(400).send({ message: 'Wrong credentials' });
    }
  } catch (error) {
    console.log('Error Login User', error);
    throw error;
  }
};
