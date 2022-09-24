import UserServices from '../services/User.service';
import users from '../database/index';

class UsersControllers {
  static async register(request, response) {
    try {
      const newUser = await UserServices.register(request.body);
      return response.status(201).send(newUser);
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }
  }

  static readAll(_, response) {
    const newUser = UserServices.readAll();
    return response.status(200).send(newUser);
  }

  static readProfile(request, response) {
    try {
      const { sub } = request.user;
      const userProfile = UserServices.readProfile(sub);

      return response.status(200).send(userProfile);
    } catch (error) {
      return response.status(404).send({ message: error.message });
    }
  }

  static update(request, response) {
    try {
      const { id } = request.params;
      const updatedProfile = UserServices.update(id, request.body);

      return response.status(200).send(updatedProfile);
    } catch (error) {
      return response.status(404).send({ message: error.message });
    }
  }

  static delete(request, response) {}
}

export default UsersControllers;
