import { denormalize, normalize, schema } from 'normalizr';

export type User = {
  id: number;
  name: string;
};

export type NormalizedUser = User;

export const userNormalizrSchemaKey = 'users';

export const userNormalizrSchema = new schema.Entity<User>(
  userNormalizrSchemaKey,
  {},
  { idAttribute: 'id' },
);

export type NormalizedUsers = {
  [id: number]: NormalizedUser;
};

export const normalizeUsers = (users: User[]) =>
  normalize<User, { [userNormalizrSchemaKey]: NormalizedUsers }, User['id'][]>(users, [
    userNormalizrSchema,
  ]);

export const denormalizeUsers = (users: ReturnType<typeof normalizeUsers>): User[] =>
  denormalize(users.result, [userNormalizrSchema], users.entities);
