import services from '../services/User.service';

class UsersControllers {
  static async register(request, response) {
    try {
      const { name, email, password, isAdm } = request.body;
      const newUser = await services.register(name, email, password, isAdm);

      return response.status(201).send(newUser);
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }
  }

  static list(_, response) {
    const newUser = services.list();
    return response.status(200).send(newUser);
  }

  static profile(request, response) {
    try {
      const { uuid } = request.user;
      const userProfile = services.profile(uuid);

      return response.status(200).send(userProfile);
    } catch (error) {
      return response.status(404).send({ message: error.message });
    }
  }

  static update(request, response) {
    try {
      const { id } = request.params;
      const updates = request.body;
      const updatedProfile = services.update(id, updates);

      return response.status(200).send(updatedProfile);
    } catch (error) {
      return response.status(404).send({ message: error.message });
    }
  }

  static delete(request, response) {
    try {
      const { id } = request.params;
      const deleteMessage = services.delete(id);

      return response.status(200).send({ message: deleteMessage });
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
}

export default UsersControllers;
