import { hash } from 'bcryptjs';
import { v4 } from 'uuid';

import users from '../database';

class UserServices {
  static async register(name, email, password, isAdm) {
    const alreadyExist = users.some((user) => user.email == email);
    if (alreadyExist) {
      throw new Error('Email already on use');
    }

    const hashedKey = await hash(password, 10);
    const now = new Date().toJSON();
    const uuid = v4();

    // prettier-ignore
    const newUser = {name, email, isAdm, createdOn: now, updatedOn: now, uuid}
    users.push({ ...newUser, password: hashedKey });
    return newUser;
  }

  static readAll() {
    return users;
  }

  static readProfile(id) {
    let loggedUser = users.find((user) => user.uuid === id);
    if (!loggedUser) {
      throw new Error('User not found');
    }

    delete loggedUser.password;
    return loggedUser;
  }

  static update(id, { body }) {
    const user = users.find((user) => user.uuid === id);
    if (!user) {
      throw new Error('User not found');
    }

    const now = new Date().toJSON();
    const updatedUser = { ...user, ...body, updatedOn: now };
    const { name, email, isAdm, createdOn, updatedOn, uuid } = updatedUser;

    users.push(updatedUser);
    return { name, email, isAdm, createdOn, updatedOn, uuid };
  }

  static delete(id) {
    const userIndex = users.findIndex((user) => user.uuid === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users.splice(this.userIndex(id), 1);
  }
}

export default UserServices;
