import * as Yup from 'yup';
import Cart from '../models/Cart';
import Product from '../models/Product';

class CartController {
  // função que insere productos
  async store(req, res) {
    // schema dos dados da requisição utilizando o Yup
    const schema = Yup.object().shape(
      {
        name: Yup.string().required(),
        description: Yup.string(),
        quantity: Yup.string().required(),
        cart_id: Yup.number().required(),
      },
    );

    // verificar se o schema está valido
    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Validation fails' });
    }

    const { cart_id } = req.body;

    // verificar se o exist alguma lista como o id recebido
    const cart = await Cart.findByPk(cart_id);

    // caso não existir retorna erro
    if (!cart) {
      return res.status(400).json({ error: 'Cart not found.' });
    }

    // registrar o produto
    const product = await Product.create(req.body);

    return res.json({
      product,
    });
  }
}

export default new CartController();
