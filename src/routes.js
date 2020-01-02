// import da classe Router do express
import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

// import dos controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CartController from './app/controllers/CartController';
// import do middleware da autenticação
import authMiddleware from './app/middleware/auth';
// instancia da classe Router
const routes = new Router();
const upload = multer(multerConfig);

// rota para criar um utilizador
routes.post('/users', UserController.store);
// rota para autenticação
routes.post('/sessions', SessionController.store);

// definir como middlware global
// terá efeito somente para as rotas abaixo visto que foi declarado depois das
// duas rotas em cima
routes.use(authMiddleware);

// rota para atualizar um utilizador
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/users/:user_id/carts', CartController.index);
routes.post('/users/:user_id/carts', CartController.store);


// export do routes
export default routes;
