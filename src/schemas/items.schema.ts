import { z } from 'zod';

/**
 * Query schema for the getItems route.
 * `lastId` is the cursor (id of the last received item); optional.
 * `limit` defaults to 20.
 */
export const getItemsQuerySchema = z.object({
  lastId: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type GetItemsQuery = z.infer<typeof getItemsQuerySchema>;

export const itemSchema = z.object({
  id: z.number().int().positive(),
});

export type Item = z.infer<typeof itemSchema>;

export const getItemsResponseSchema = z.object({
  items: z.array(itemSchema),
  lastId: z.number().int().positive().nullable(),
});

export type GetItemsResponse = z.infer<typeof getItemsResponseSchema>;
