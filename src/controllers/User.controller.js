import services from '../services/User.service';
import users from '../database/index';

class UsersControllers {
  static async register(request, response) {
    try {
      const { name, email, password, isAdm } = request.body;
      const newUser = services.register(name, email, password, isAdm);

      return response.status(201).send(newUser);
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }
  }

  static readAll(_, response) {
    const newUser = services.readAll();
    return response.status(200).send(newUser);
  }

  static readProfile(request, response) {
    try {
      const { sub } = request.user;
      const userProfile = services.readProfile(sub);

      return response.status(200).send(userProfile);
    } catch (error) {
      return response.status(404).send({ message: error.message });
    }
  }

  static update(request, response) {
    try {
      const { id } = request.params;
      const updatedProfile = services.update(id, request.body);

      return response.status(200).send(updatedProfile);
    } catch (error) {
      return response.status(404).send({ message: error.message });
    }
  }

  static delete(request, response) {
    try {
      const { id } = request.params;
      services.delete(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
}

export default UsersControllers;
