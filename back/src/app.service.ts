import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserField } from "./entity/user.entity";

@Injectable()
export class AppService {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', age: 25 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 30 },
    { id: '3', name: 'Alice Johnson', email: 'alice@example.com', age: 22 },
  ];
  private currentId = 3;

  getUsers(): User[] {
    return this.users;
  }

  filterUsers(field: UserField, value: string): User[] {
    return this.users.filter(user => user[field] === value); 
  }

  findUserByCriteria(criteria: { field: UserField; value: string }): User {
    const user = this.users.find(user => user[criteria.field] === criteria.value);
    if (!user) {
      throw new Error(`User not found with ${criteria.field} = ${criteria.value}`);
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    this.currentId += 1;  
    const newUser: User = {
      id: this.currentId.toString(),
      ...createUserDto
    };
    this.users.push(newUser);
    return newUser;
  }

  createUsers(createUsersDto: CreateUserDto[]): User[] {
    const newUsers = createUsersDto.map(userDto => {
      this.currentId += 1;
      return {
        id: this.currentId.toString(),
        ...userDto,
      };
    });
    this.users.push(...newUsers);
    return newUsers;
  }
}
