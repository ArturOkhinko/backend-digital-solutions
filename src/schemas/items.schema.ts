import { z } from 'zod';

export const idSchema = z.union([z.coerce.number().int().positive(), z.string().min(1)]);

export type Id = z.infer<typeof idSchema>;

export const getItemsQuerySchema = z
  .object({
    lastId: idSchema.optional(),
    limit: z.coerce.number().int().positive().max(100).default(20),
  })
  .strict();

export type GetItemsQuery = z.infer<typeof getItemsQuerySchema>;

export const createItemSchema = z
  .object({
    id: idSchema,
  })
  .strict();

export type CreateItemInput = z.infer<typeof createItemSchema>;

export const itemSchema = z.object({
  id: idSchema,
});

export type Item = z.infer<typeof itemSchema>;

export const getItemsResponseSchema = z.object({
  items: z.array(itemSchema),
  lastId: idSchema.nullable(),
});

export type GetItemsResponse = z.infer<typeof getItemsResponseSchema>;
