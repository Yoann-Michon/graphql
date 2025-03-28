// create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;
}
