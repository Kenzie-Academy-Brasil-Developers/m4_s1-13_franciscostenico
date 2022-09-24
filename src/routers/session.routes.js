import { Router } from 'express';
import session from '../controllers/Session.controller';
import fields from '../middlewares/FieldValidations.middleware';

const sessionRoute = Router();

sessionRoute.post('', fields.check('all', ...fields.login), session.login);

export default sessionRoute;
