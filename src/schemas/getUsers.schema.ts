import { z } from 'zod';

/**
 * Query schema for the getUsers route.
 * Accepts the id of the last user already received (cursor).
 * `limit` is fixed to 20 by default but kept here for clarity/extensibility.
 */
export const getUsersQuerySchema = z.object({
  lastUserId: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;

/**
 * Shape of a single user returned by the endpoint.
 */
export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;

/**
 * Response schema: the next batch of users.
 */
export const getUsersResponseSchema = z.object({
  users: z.array(userSchema),
  lastUserId: z.number().int().positive().nullable(),
});

export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
