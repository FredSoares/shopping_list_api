import Sequelize, { Model } from 'sequelize';

class Cart extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Cart;
