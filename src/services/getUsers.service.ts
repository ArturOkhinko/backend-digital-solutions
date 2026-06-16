import { GetUsersQuery, GetUsersResponse } from '../schemas/getUsers.schema';

/**
 * Returns the next `limit` users after `lastUserId`.
 * Business logic is intentionally not implemented yet.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUsers = async (query: GetUsersQuery): Promise<GetUsersResponse> => {
  // TODO: implement business logic (pagination, data source, etc.)
  throw new Error('Not implemented');
};
