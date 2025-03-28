import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User, UserField } from './entity/user.entity';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: AppService,
  ) {}

  @Query(() => [User])
  getUsers(): User[] {
    return this.userService.getUsers();
  }

@Query(() => [User])
filterUsers(
  @Args('field') field: UserField,
  @Args('value') value: string,
): User[] {
  return this.userService.filterUsers(field, value);
}


  @Query(() => User)
  findUser(
    @Args('field') field: UserField,
    @Args('value') value: string,
  ): User {
    return this.userService.findUserByCriteria({ field, value });
  }

  @Mutation(() => User)
  async createUser(@Args('user', { type: () => CreateUserDto }) createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userService.createUser(createUserDto);
    
    return newUser;
  }

  @Mutation(() => [User])
  async createUsers(@Args('users', { type: () => [CreateUserDto] }) createUserDto: CreateUserDto[]): Promise<User[]> {
    const newUsers = await this.userService.createUsers(createUserDto);

    return newUsers;
  }

}
