import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      description: Sequelize.STRING,
      quantity: Sequelize.STRING,
    },
    {
      sequelize,
    });

    return this;
  }

  /* metodo que recebe todos os models da aplicação */
  static associate(models) {
    /* Cria uma associação entre this (a fonte) e o destino fornecido.
     * A chave estrangeira é adicionada na fonte. */
    this.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'cart' });
  }
}

export default Product;
