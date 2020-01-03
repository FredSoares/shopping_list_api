import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import routes from './routes';

import './database';

class App {
  // metodo que será chamado na inicialização da classe
  // possui todas as configurações necessarias
  constructor() {
    this.server = express();
    // inicialização dos metodos
    this.middleware();
    this.routes();
  }

  middleware() {
    // permite controlar quais aplicações irão acessar a api
    this.server.use(cors());
    // config para receber requisicoes no formato JSON
    this.server.use(express.json());
  }

  routes() {
    // utiliza rotas do arquivo routes
    this.server.use(routes);
  }
}
// export da classe para que possa ser utilizada por outras classes
// OBS: App().server porque é a unica coisa que será utilizado foi passado diretamente
module.exports = new App().server;
