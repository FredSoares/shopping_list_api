import * as Yup from 'yup';
import Cart from '../models/Cart';
import User from '../models/User';

class CartController {
  // função que retorna todas as lista de compras de um determinado utilizador
  async index(req, res) {
    /* pegar o id do utilizador no parametro da requisição */
    const { user_id } = req.params;
    console.log(user_id);

    /* verificar se o utilizador existe */
    const userExist = await User.findByPk(user_id);

    /* caso não existir retornar erro */
    if (!userExist) {
      return res.status(404).json({ error: 'User not found' });
    }

    const carts = await Cart.findAll({
      where: {
        user_id,
      },
    });

    /* const users = await User.findByPk(user_id, {
      include: { association: 'carts' },
    }); */

    return res.json(carts);
  }

  // função que recebe os dados da requisição e faz a criação da lista para o carrinho de compra
  async store(req, res) {
    // schema dos dados da requisição utilizando o Yup
    const schema = Yup.object().shape(
      {
        name: Yup.string().required(),
      },
    );

    // verificar se o schema está valido
    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Validation fails' });
    }

    // pegar o id do utilizador no parametro da requisição e o nome no body
    const { user_id } = req.params;
    const { name } = req.body;


    // verificar se o exist algum utilizador como o id recebido
    const user = await User.findByPk(user_id);

    // caso não existir retorna erro com o status 400
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    // registrar a lista do compras
    const cart = await Cart.create({ name, user_id });

    return res.json({
      cart,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleted = await Cart.destroy({
      where: {
        id,
      },
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Card not found' });
    }
    return res.status(200).json({ message: 'Card was deleted' });
  }
}

export default new CartController();
