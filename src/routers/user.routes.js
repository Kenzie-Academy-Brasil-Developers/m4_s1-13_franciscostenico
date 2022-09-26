import { Router } from 'express';
import user from '../controllers/User.controller';
import ensure from '../middlewares/Ensure.middleware';
import fields from '../middlewares/FieldValidations.middleware';

const userRoute = Router();

userRoute.post('', fields.check('all', ...fields.register), user.register);
userRoute.get('', ensure.authentication, ensure.adminOnly, user.list);
userRoute.get('/profile', ensure.authentication, user.profile);
userRoute.patch( 
  '/:id', fields.check('parse', ...fields.updateUser), ensure.authentication, ensure.adminPermissions, user.update
);
userRoute.delete('/:id', ensure.authentication, ensure.adminPermissions, user.delete);

export default userRoute;
