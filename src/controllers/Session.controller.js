import SessionServices from '../services/Sessions.service';

class SessionControllers {
  static async login(request, response) {
    try {
      const newLogin = await SessionServices.login(request.body);
      return response.status(200).send(newLogin);
    } catch (error) {
      return response.status(401).send({ message: error.message });
    }
  }
}

export default SessionControllers;
