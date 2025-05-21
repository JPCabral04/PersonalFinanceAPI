import status from 'http-status';
import { AppDataSource } from '../data-source';
import { Account } from '../entity/Account';
import { User } from '../entity/User';

const accountRepo = AppDataSource.getRepository(Account);
const userRepo = AppDataSource.getRepository(User);

export const createAccount = async (req, res) => {
  const userId = req.user.id;
  const { name, accountType, balance } = req.body;

  if (!name || !accountType) {
    return res
      .status(status.BAD_REQUEST)
      .json({ error: 'Nome e tipo de conta são obrigatórios' });
  }

  try {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const account = accountRepo.create({
      name,
      accountType,
      balance: balance ?? 0,
      user,
    });

    await accountRepo.save(account);
    res.status(status.CREATED).json(account);
  } catch (err) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao criar a conta' });
  }
};

export const getAccounts = async (req, res) => {
  const userId = req.user.id;

  try {
    const accounts = await accountRepo.find({
      where: { user: { id: userId } },
    });
    res.status(status.OK).json(accounts);
  } catch (err) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao buscar contas' });
  }
};

export const updateAccount = async (req, res) => {
  const { name, accountType, balance } = req.body;

  try {
    const account = await accountRepo.findOne({
      where: {
        id: parseInt(req.params.id),
        user: { id: req.user.id },
      },
    });

    if (!account)
      return res
        .status(404)
        .json({ error: 'Conta não encontrada ou acesso negado' });

    account.name = name ?? account.name;
    account.accountType = accountType ?? account.accountType;
    account.balance = balance ?? account.balance;

    await accountRepo.save(account);

    res.status(status.OK).json(account);
  } catch (err) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao atualizar conta' });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const account = await accountRepo.findOne({
      where: {
        id: parseInt(req.params.id),
        user: { id: req.user.id },
      },
    });

    if (!account)
      return res
        .status(404)
        .json({ error: 'Conta não encontrada ou acesso negado' });

    await accountRepo.remove(account);

    res.status(status.ACCEPTED).json({ message: 'Conta deletada com sucesso' });
  } catch (err) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao deletar conta' });
  }
};
