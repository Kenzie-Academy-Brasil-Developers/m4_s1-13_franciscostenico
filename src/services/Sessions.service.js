import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import users from '../database';

class SessionServices {
  static async login({ email, password }) {
    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new Error('Wrong email/password');
    }

    const passwordCheck = await compare(password, user.password);
    if (!passwordCheck) {
      throw new Error('Wrong email/password');
    }

    const token = jwt.sign(
      {
        isAdm: user.isAdm,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '24h',
        subject: user.uuid,
      }
    );

    return { user, token };
  }
}

export default SessionServices;
