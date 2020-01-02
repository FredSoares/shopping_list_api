import * as Yup from 'yup';
import Cart from '../models/Cart';
import User from '../models/User';

class CartController {
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
      return res.status(400).json({ error: 'Validation fails' });
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
}

export default new CartController();
