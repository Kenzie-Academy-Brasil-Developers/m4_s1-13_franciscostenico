import jwt from 'jsonwebtoken';
import 'dotenv/config';

class Ensure {
  static authentication(request, response, next) {
    let token = request.headers.authorization;

    if (!token) {
      return response
        .status(401)
        .send({ message: 'Missing authorization headers' });
    }

    token = token.split(' ')[1];
    const options = (error, decoded) => {
      if (error) {
        return response.status(401).send({ message: 'Invalid token' });
      }

      request.user = { isAdm: decoded.isAdm, sub: decoded.sub };
      next();
    };

    jwt.verify(token, process.env.SECRET_KEY, options);
  }

  static adminOnly(request, response, next) {
    const { isAdm } = request.user;
    if (!isAdm) {
      return response.status(401).send({ message: 'Unauthorized' });
    }

    next();
  }

  static adminPermissions(request, response, next) {
    const { isAdm, sub } = request.user;
    const { id } = request.params;

    const compareIds = sub === id;
    if (isAdm || compareIds) {
      return response
        .status(401)
        .send({ message: 'Missing admin permissions' });
    }

    next();
  }
}

export default Ensure;
