import { AppDataSource } from '../data-source';
import { LoginDTO, UserDTO } from '../dtos/UserDTO';
import { User } from '../entity/User';
import { validateRequest } from '../utils/validateRequest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepo = AppDataSource.getRepository(User);

export const registerUser = async (data: any) => {
  await validateRequest(UserDTO, data);

  const exists = await userRepo.findOne({ where: { email: data.email } });
  if (exists) throw new Error('Email já cadastrado');

  const password_hash = await bcrypt.hash(data.password, 10);
  const user = userRepo.create({ ...data, password_hash });
  return await userRepo.save(user);
};

export const loginUser = async (data: any) => {
  await validateRequest(LoginDTO, data);

  const user = await userRepo.findOne({ where: { email: data.email } });
  if (!user) throw new Error('Email não cadastrado');

  const isMatch = await bcrypt.compare(data.password, user.password_hash);
  if (!isMatch) throw new Error('Senha incorreta');

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};
