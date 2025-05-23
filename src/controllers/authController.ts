import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { status } from 'http-status';

const userRepo = AppDataSource.getRepository(User);

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: 'A senha deve ter no mínimo 6 caracteres' });
    }

    const exists = await userRepo.findOne({ where: { email } });
    if (exists) {
      return res
        .status(status.BAD_REQUEST)
        .json({ error: 'Email já cadastrado' });
    }

    const user = userRepo.create({
      name,
      email,
      password_hash: await bcrypt.hash(password, 10),
    });

    await userRepo.save(user);
    res.status(status.CREATED).json(user);
  } catch (err) {
    if (Array.isArray(err)) {
      const messages = err
        .map((e) => Object.values(e.constraints || {}))
        .flat();
      return res.status(status.BAD_REQUEST).json({ errors: messages });
    }

    console.error(err);
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao registrar usuário' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ error: 'Email não cadastrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(status.UNAUTHORIZED).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.status(status.OK).json({ token });
  } catch (err) {
    console.error(err);
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao fazer login' });
  }
};
