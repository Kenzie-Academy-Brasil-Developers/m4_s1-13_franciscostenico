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

  static list() {
    return users;
  }

  static profile(id) {
    const userProfile = users.find(({ uuid }) => uuid == id);
    if (!userProfile) {
      throw new Error('User not found');
    }

    const { name, email, isAdm, createdOn, updatedOn, uuid } = userProfile;
    return { name, email, isAdm, createdOn, updatedOn, uuid };
  }

  static update(id, updates) {
    const userIndex = users.findIndex(({ uuid }) => uuid == id);
    const user = users.find(({ uuid }) => uuid == id);
    if (!user) {
      throw new Error('User not found');
    }

    const now = new Date().toJSON();
    const updatedUser = { ...user, ...updates, updatedOn: now };
    const { name, email, isAdm, createdOn, updatedOn, uuid } = updatedUser;

    users.splice(userIndex, 1, updatedUser);
    return { name, email, isAdm, createdOn, updatedOn, uuid };
  }

  static delete(id) {
    const userIndex = users.findIndex((user) => user.uuid === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users.splice(userIndex, 1);
    return 'User deleted with success';
  }
}

export default UserServices;
