import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;
}

export enum UserField {
  Name = 'name',
  Email = 'email',
  Age = 'age',
}

