import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Cart from '../app/models/Cart';
import Product from '../app/models/Product';

import databaseConfig from '../config/database';

/* array com todos os models */
const models = [User, File, Cart, Product];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    /* percorrer o array dos models e enviar a conexao para cada modelo */
    models
      .map((model) => model.init(this.connection))
      /* percorrer o array dos models e chamar o metodo associate caso existir */
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
