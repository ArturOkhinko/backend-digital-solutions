import { z } from 'zod';
import { idSchema } from './items.schema';

export const selectIdsSchema = z
  .object({
    ids: z.array(idSchema).min(1),
  })
  .strict();

export type SelectIdsInput = z.infer<typeof selectIdsSchema>;

export const reorderSelectedSchema = z
  .object({
    id: idSchema,
    afterId: idSchema.nullable(),
  })
  .strict();

export type ReorderSelectedInput = z.infer<typeof reorderSelectedSchema>;
