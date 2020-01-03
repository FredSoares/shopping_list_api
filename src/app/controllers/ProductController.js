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

    // verificar se o exist alguma cart como o id recebido
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

  // função que apaga productos
  async delete(req, res) {
    const { id } = req.params;

    const deleted = await Product.destroy({
      where: {
        id,
      },
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product was deleted' });
  }
}

export default new CartController();
