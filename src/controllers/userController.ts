import status from 'http-status';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const userRepo = AppDataSource.getRepository(User);

export const getAllUsers = async (req, res) => {
  try {
    const users = await userRepo.find();
    res.status(status.OK).json(users);
  } catch (err) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao buscar usuários' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userRepo.findOneBy({
      id: req.user.id,
    });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(status.OK).json(user);
  } catch (err) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao buscar usuários' });
  }
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await userRepo.findOneBy({
      id: req.user.id,
    });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    await userRepo.save(user);

    res.status(status.OK).json(user);
  } catch (err) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao atualizar usuário' });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.user.id;
  try {
    const result = await userRepo.delete(id);
    if (result.affected == 0)
      return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json(status.ACCEPTED);
  } catch (err) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao deletar usuário' });
  }
};
