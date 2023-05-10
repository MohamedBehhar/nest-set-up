import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './entities';

const users = [
  {
    id: 1,
    name: 'John Doe',
    age: 25,
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 26,
  },
  {
    id: 3,
    name: 'Johnny Doe',
    age: 27,
  },
];

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = users.find((u) => createUserDto.id === u.id);
    if (user)
      throw new ConflictException(`User #${createUserDto.id} already exists`);
    users.push(createUserDto);
    return createUserDto;
  }

  findAll() {
    return users;
  }

  findOne(id: number) {
    const user = users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = users.findIndex((user) => user.id === id);
    if (user === -1) throw new NotFoundException(`User #${id} not found`);
    users[user] = { ...users[user], ...updateUserDto };
    return users[user];
  }

  remove(id: number) {
    const user = users.findIndex((user) => user.id === id);
    if (user === -1) throw new NotFoundException(`User #${id} not found`);
    users.splice(user, 1);
    return true;
  }
}
